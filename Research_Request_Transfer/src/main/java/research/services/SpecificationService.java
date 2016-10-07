package research.services;

import com.mongodb.WriteResult;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import research.annotation.Format;
import research.db.MongoOperationGenerator;
import research.formatengine.FormatPatternServer;
import research.formatengine.StringFormatter;
import research.models.Specification;
import java.lang.reflect.Method;
import java.util.*;

/**
 * Created by akila on 8/23/16.
 */
public class SpecificationService {


    public Specification addSpecification(Specification specification){

        MongoOperations mongoOperations = MongoOperationGenerator.getMongoOperationGenerator().getMongoOperations();
        System.err.println(specification.getAppId());
        mongoOperations.insert(specification,"specifications");
        System.out.println(specification.getAppId());
        return specification;
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
        ArrayList<String> nestedList = new ArrayList<>();
        nestedList.add("Nested");
        ArrayList<String> numberFormatPatternList = FormatPatternServer.getFormatPatternServer().getNumberFormatPattern();
        ArrayList<String> dateFormatPatternList = FormatPatternServer.getFormatPatternServer().getDateFormatPattern();
        stringArrayListMap.put("String",stringFormatList);
        stringArrayListMap.put("Date", dateFormatPatternList);
        stringArrayListMap.put("Number",numberFormatPatternList);
        stringArrayListMap.put("Nested",nestedList);

/*
        for (SpecificationItem specificationItem : specification.getList() ) {
            String key = specificationItem.getKey();
            String valueType = specificationItem.getValueType();
            stringArrayListMap.put(key,stringFormatList);
                //key.matches("[-+]?\\d*\\.?\\d+")
                if (valueType.equals("Date")) {
                    stringArrayListMap.put(key + "Value", dateFormatPatternList);
                    //key.matches("([0-9]{2})/([0-9]{2})/([0-9]{4})") | key.matches("([0-9]{4})/([0-9]{2})/([0-9]{2})"
                } else if (valueType.equals("Number")) {
                    stringArrayListMap.put(key + "Value", numberFormatPatternList);
                } else if(valueType.equals("String")) {
                    stringArrayListMap.put(key+ "Value",stringFormatList);
                }else{

                }
        }
*/
        return stringArrayListMap;

    }


    /*public Specification getLastSpecification(){
        MongoOperations mongoOperation = MongoOperationGenerator.getMongoOperationGenerator().getMongoOperations();
        Query q = new Query().with(new Sort(Sort.Direction.DESC, "created"));
        List<Specification> specificationList = mongoOperation.find(q, Specification.class, "specifications");
        if(specificationList.size()>0){
            System.err.println(specificationList.get(0).getAppId());
            return specificationList.get(0);
        }else{
            return null;
        }
    }
    */

    public Specification deleteSpecification(String appId){

        MongoOperations mongoOperations = MongoOperationGenerator.getMongoOperationGenerator().getMongoOperations();
        Query query2 = new Query();
        query2.addCriteria(Criteria.where("appId").is(appId));
        Specification specification = mongoOperations.findAndRemove(query2, Specification.class, "specifications");
        return specification;

    }

}
