package research.formatengine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import research.annotation.Format;
import research.exception.DataNotFoundException;
import research.exception.InvalidValueFormatterException;
import research.exception.InvalidValueTypeException;
import research.models.Specification;
import research.models.SpecificationItem;

import javax.xml.crypto.Data;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by akila on 8/31/16.
 */
public class RequestTransformer {

    boolean isKey = true;
    private Specification specification;
    private DateFormatter dateFormatter;
    private ListFormatter listFormatter;
    private NumberFormatter numberFormatter;
    private StringFormatter stringFormatter;

    private static final Logger logger = LoggerFactory.getLogger(RequestTransformer.class);


    public RequestTransformer() {
    }

    public RequestTransformer(Specification specification) {
        this.specification = specification;
    }


    public void setSpecification(Specification specification) {
        this.specification = specification;
    }



    public void setDateFormatter(DateFormatter dateFormatter) {
        this.dateFormatter = dateFormatter;
    }

    public void setListFormatter(ListFormatter listFormatter) {
        this.listFormatter = listFormatter;
    }

    public void setNumberFormatter(NumberFormatter numberFormatter) {
        this.numberFormatter = numberFormatter;
    }

    public void setStringFormatter(StringFormatter stringFormatter) {
        this.stringFormatter = stringFormatter;
    }

    public SpecificationItem findFormattingSpecificationItem(ArrayList<SpecificationItem> specificationItemList, String key) {

        for (SpecificationItem specificationItem : specificationItemList) {
            if (key.equals(specificationItem.getKey())) {
                return specificationItem;
            }
        }
        return null;
    }


    public HashMap<String, Object> transform(HashMap<String, Object> requestBody) {

        Iterator requestKeyValuePairs = requestBody.entrySet().iterator();

        HashMap<String, Object> request = new HashMap<String, Object>();

        ArrayList<SpecificationItem> specificationItemList = this.specification.getList();


        while (requestKeyValuePairs.hasNext()) {

            Map.Entry pair = (Map.Entry) requestKeyValuePairs.next();
            SpecificationItem specificationItem = findFormattingSpecificationItem(specificationItemList, (String) pair.getKey());

            if (specificationItem == null) {

                request.put((String) pair.getKey(), pair.getValue());

            } else {

                String key = (String) this.singleValueFormatter(pair.getKey(), specificationItem, isKey);
                Object value = this.singleValueFormatter(pair.getValue(), specificationItem, !isKey);
                if (specificationItem.getValueType().equals("List")) {
                    Map<String, Object> map = (Map<String, Object>) value;
                    for (String mapKey : map.keySet()) {
                        if (mapKey.equals("list")) {
                            value = map.get(mapKey);
                        } else {
                            request.put(mapKey, map.get(mapKey));
                        }
                    }
                }
                request.put(key, value);
            }
        }
        return request;
    }


    private Object singleValueFormatter(Object value, SpecificationItem specificationItem, boolean isKey) {
        String type = specificationItem.getValueType();
        String formattingpatttern;
        if (isKey) {
            formattingpatttern = specificationItem.getKeyFormatter();
        } else {
            formattingpatttern = specificationItem.getValueFormatter();
        }

        if (isKey || type.equals("String")) {

            if (isKey && formattingpatttern.equals("custom")) {
                return specificationItem.getUpdatedKey();
            }
            String stringItem = (String) value;
            return stringValueFormatter(stringItem, formattingpatttern);

        } else if (type.equals("Date")) {

            return dateValueFormatter(value, specificationItem, formattingpatttern);

        } else if (type.equals("Nested")) {
            //RequestTransformer transformer = new RequestTransformer(this.specification);
            HashMap<String, Object> map = (HashMap<String, Object>) value;
            return this.transform(map);
        } else if (type.equals("Number")) {
            if (!formattingpatttern.equals("nothing")) {
                numberFormatter.setPattern(formattingpatttern);
                String format = numberFormatter.format(String.valueOf(value));
                return format;
            }
            return value;
        } else if (type.equals("List")) {
            return listValueFormatter(value, specificationItem, formattingpatttern);
        }else{
            throw new InvalidValueTypeException(type +" type is not a valid value type");
        }
    }

    public Object stringValueFormatter(String value, String formattingpatttern) {
        if (!formattingpatttern.equals("nothing")) {

            try {

                StringFormatter stringFormatter = StringFormatter.class.newInstance();
                return this.selectMethod("research.formatengine.StringFormatter", formattingpatttern).invoke(stringFormatter, value);

            } catch (Exception e) {

                throw new InvalidValueFormatterException(formattingpatttern + " is not a valid formatting pattern for string");

            }

        }
        return value;

    }

    public Object dateValueFormatter(Object value, SpecificationItem specificationItem, String formattingpatttern) {
        if (!formattingpatttern.equals("nothing")) {
            dateFormatter.setPattern(formattingpatttern);
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(specificationItem.getValueInputFormat());
            try {
                Date parse = simpleDateFormat.parse((String) value);
                String format = dateFormatter.format(parse);
                return format;
            } catch (ParseException e) {
                //e.printStackTrace();
                return new InvalidValueFormatterException("invalid dateinputformat or invalid formatting pattern");
            }
        }
        return value;
    }

    public Object listValueFormatter(Object value, SpecificationItem specificationItem, String formattingpatttern) {

        Map<String, Object> outputMap = new HashMap<>();
        List<Object> objectItemList = (List<Object>) value;
        List<Object> formattedObjectItemList = new ArrayList<>();

        if (specificationItem.getValueInputFormat().equals("objectList")) {
            for (int i = 0; i < objectItemList.size(); i++) {
                HashMap<String, Object> map = (HashMap<String, Object>) objectItemList.get(i);
                formattedObjectItemList.add(this.transform(map));
            }
        } else if (specificationItem.getValueInputFormat().equals("valueList")) {
            formattedObjectItemList = objectItemList;
        }else{
            throw new InvalidValueTypeException(specificationItem.getValueInputFormat()+" is not a valid valueInputFormat for list");
        }

        if (!formattingpatttern.equals("nothing")) {
            double calculatedValue = 0;

            try {
                String[] valueFormatterList = formattingpatttern.split(",");
                String[] operationKeys = specificationItem.getOperationKey().split(",");
                String[] customValueNames = specificationItem.getCustomValueNames().split(",");
                int listCounter = 0;
                for (String valueFormatter : valueFormatterList) {
                   try {
                       calculatedValue = Double.parseDouble(String.valueOf(selectMethod("research.formatengine.ListFormatter", valueFormatter).invoke(listFormatter, value, specificationItem.getValueInputFormat().equals("objectList") ?operationKeys[listCounter] :"", specificationItem.getValueInputFormat())));

                   }catch (NumberFormatException error){
                       System.err.println("line 216");
                      throw  new InvalidValueFormatterException(value +" is not a number");

                   }catch (ArrayIndexOutOfBoundsException error){
                     throw  new DataNotFoundException("operation key is not found for valueformatter"+ valueFormatter);
                   }
                   try {
                       outputMap.put(customValueNames[listCounter], calculatedValue);
                   }catch (ArrayIndexOutOfBoundsException error){
                      throw new DataNotFoundException("custom name is not found for valueformatter "+valueFormatter);
                   }
                       listCounter++;
                }

            } catch (IllegalAccessException e) {
               throw new DataNotFoundException(e.getMessage());
            }catch (NullPointerException e){
                e.printStackTrace();
            }catch (InvocationTargetException e){
                throw  new DataNotFoundException(e.toString());
            }


            outputMap.put("list", formattedObjectItemList);

        } else {
            outputMap.put("list", formattedObjectItemList);
        }
        return outputMap;

    }

    private Method selectMethod(String classpath, String format) {

        try {

            Class cls = Class.forName(classpath);
            Method[] methods = cls.getDeclaredMethods();
            for (Method method : methods) {
                Format annotation = method.getAnnotation(Format.class);
                String s = annotation.methodTask();
                if (s.equals(format)) {
                    return method;
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
