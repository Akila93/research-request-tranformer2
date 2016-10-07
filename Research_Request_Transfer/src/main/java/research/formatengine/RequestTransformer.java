package research.formatengine;

import research.annotation.Format;
import research.models.Request;
import research.models.Specification;
import research.models.SpecificationItem;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by akila on 8/31/16.
 */
public class RequestTransformer {

    private Specification specification;

    public RequestTransformer(){}
    public RequestTransformer(Specification specification){
        this.specification = specification;
    }



    public HashMap<String, Object> transform(HashMap<String,Object> requestBody){

        Iterator iterator=requestBody.entrySet().iterator();
        HashMap<String,Object> request = new HashMap<String, Object>();

        ArrayList<SpecificationItem> items = this.specification.getList();

        class FindFormattingElement{
            private ArrayList<SpecificationItem> itemlist;
            public FindFormattingElement(ArrayList<SpecificationItem> itemlist){this.itemlist = itemlist;}
            public SpecificationItem find(String key){
                Iterator it =itemlist.iterator();

                while (it.hasNext()){
                    SpecificationItem specificationItem = (SpecificationItem)it.next();
                    if(key.equals(specificationItem.getKey())){
                        return specificationItem;
                    }

                }

                return null;
            }
        }


        FindFormattingElement find = new FindFormattingElement(items);
        while (iterator.hasNext()){
            Map.Entry pair = (Map.Entry) iterator.next();
            SpecificationItem specificatinItem = find.find((String) pair.getKey());
            if(specificatinItem==null) {
                request.put((String) pair.getKey(), pair.getValue());
            }else {

                //if(specificatinItem.getKeyFormatter())
                request.put((String) this.elementTransform(pair.getKey(), specificatinItem, true), this.elementTransform(pair.getValue(), specificatinItem, false));
            }
        }
        return request;
    }


    private Object elementTransform(Object element,SpecificationItem specificationItem,boolean isKey){

        if (isKey) {
                return this.actualElementTransform(element,specificationItem,true);
            } else {

                return this.actualElementTransform(element, specificationItem,false);
            }

    }

    private Object actualElementTransform(Object element,SpecificationItem specificationItem,boolean isKey){
        String type=specificationItem.getValueType();
        String formattingpatttern;
        if(isKey){
            formattingpatttern=specificationItem.getKeyFormatter();
        }
        else {
            formattingpatttern=specificationItem.getValueFormatter();
        }

        if(formattingpatttern.equals("nothing")){
            return element;

            
        }

        if (isKey || type.equals("String")) {

            if(isKey && formattingpatttern.equals("custom")){
                return specificationItem.getUpdatedKey();
            }
            String stringItem = (String) element;
            Class cls = null;
            try {
                cls = Class.forName("research.formatengine.StringFormatter");
                StringFormatter formatter = (StringFormatter) cls.newInstance();
                element =this.selectMethod(formatter, formattingpatttern).getName();
                return this.selectMethod(formatter, formattingpatttern).invoke(formatter, stringItem);
            } catch (Exception e) {
                e.printStackTrace();
            }

            return element;
        }else if( type.equals("Date")) {
            DateFormatter dateFormatter = new DateFormatter(formattingpatttern);
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(specificationItem.getValueInputFormat());
            try {
                Date parse = simpleDateFormat.parse((String) element);
                String format = dateFormatter.format(parse);
                return format;
            } catch (ParseException e) {
                e.printStackTrace();
            }

            return element;
        }else if(type.equals("Nested")){
                RequestTransformer transformer = new RequestTransformer(this.specification);
            HashMap<String, Object> map = (HashMap<String, Object>) element;
                return transformer.transform(map);
        }else if(type.equals("Number")){

            NumberFormatter numberFormatter = new NumberFormatter(formattingpatttern);
            String format = numberFormatter.format(String.valueOf(element));
            System.err.println(format);
            return format;

        }else if(type.equals("List")){
            ListFormatter listFormatter = new ListFormatter();
            listFormatter.calculateTotal(element,specificationItem.getOperationKey());

        }

        return element;
    }


    private Method selectMethod(StringFormatter formatter,String format){

        try {
            Class cls = Class.forName("research.formatengine.StringFormatter");
            Object obj =cls.newInstance();
            Method[] methods =cls.getDeclaredMethods();
            for (Method method:methods) {
                Format annotation = method.getAnnotation(Format.class);
                String s = annotation.methodTask();
                if(s.equals(format)){
                    return method;
                }


            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

}
