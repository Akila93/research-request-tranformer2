package research.services;

import org.springframework.data.mongodb.core.MongoOperations;
import research.annotation.Format;
import research.db.MongoOperationGenerator;
import research.formatengine.FormatPatternServer;
import research.formatengine.StringFormatter;
import research.models.SpecificationItem;
import research.models.Specification;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by akila on 8/23/16.
 */
public class SpecificationService {


    public void addSpecification(Specification specification){
        MongoOperations mongoOperations = MongoOperationGenerator.getMongoOperationGenerator().getMongoOperations();
        mongoOperations.insert(specification,"specifications");
    }

    public Map<String,ArrayList<String>> getAvailableFormatting(){

        Map<String, ArrayList<String>> stringArrayListMap = new HashMap<>();
        StringFormatter stringFormatter = new StringFormatter();
        Method[] methods = stringFormatter.getClass().getMethods();
        ArrayList<String> stringFormatList = new ArrayList<>();
        for (Method method : methods) {
            Format annotation = method.getAnnotation(Format.class);
            if(annotation!=null) {
                stringFormatList.add(annotation.methodTask());
            }
        }
        ArrayList<String> numberFormatPatternList = FormatPatternServer.getFormatPatternServer().getNumberFormatPattern();
        ArrayList<String> dateFormatPatternList = FormatPatternServer.getFormatPatternServer().getDateFormatPattern();
        stringArrayListMap.put("String",stringFormatList);
        stringArrayListMap.put("Date", dateFormatPatternList);
        stringArrayListMap.put("Number",numberFormatPatternList);


//
//        for (SpecificationItem specificationItem : specification.getList() ) {
//            String key = specificationItem.getKey();
//            String valueType = specificationItem.getValueType();
//
//            stringArrayListMap.put(key,stringFormatList);
//                //key.matches("[-+]?\\d*\\.?\\d+")
//                if (valueType.equals("Date")) {
//                    stringArrayListMap.put(key + "Value", dateFormatPatternList);
//                    //key.matches("([0-9]{2})/([0-9]{2})/([0-9]{4})") | key.matches("([0-9]{4})/([0-9]{2})/([0-9]{2})"
//                } else if (valueType.equals("Number")) {
//                    stringArrayListMap.put(key + "Value", numberFormatPatternList);
//                } else if(valueType.equals("String")) {
//                    stringArrayListMap.put(key+ "Value",stringFormatList);
//                }else{
//
//                }
//        }

        return stringArrayListMap;

    }

}
