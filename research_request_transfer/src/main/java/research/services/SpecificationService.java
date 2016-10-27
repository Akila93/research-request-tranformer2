package research.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import research.annotation.Format;
import research.db.MongoOperationGenerator;
import research.formatengine.FormatPatternServer;
import research.formatengine.ListFormatter;
import research.formatengine.StringFormatter;
import research.models.Specification;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by akila on 8/23/16.
 */


public class SpecificationService {

    private StringFormatter stringFormatter;
    private ListFormatter listFormatter;

    private static final Logger logger = LoggerFactory.getLogger(SpecificationService.class);

    public void setStringFormatter(StringFormatter stringFormatter) {
        this.stringFormatter = stringFormatter;
    }

    public void setListFormatter(ListFormatter listFormatter) {
        this.listFormatter = listFormatter;
    }

    public Specification addSpecification(Specification specification) {
        logger.info("specification.addSpecification is called");

        MongoOperations mongoOperations = MongoOperationGenerator.getMongoOperationGenerator().getMongoOperations();
        mongoOperations.insert(specification, "specifications");
        return specification;
    }

    public Map<String, ArrayList<String>> getAvailableFormatting() {

        logger.info("specificationService.getAvailableFormatting is called");

        Map<String, ArrayList<String>> stringArrayListMap = new HashMap<>();
        ArrayList<String> stringFormatList = new ArrayList<>();
        Method[] methods = stringFormatter.getClass().getMethods();
        for (Method method : methods) {
            Format annotation = method.getAnnotation(Format.class);
            if (annotation != null) {
                stringFormatList.add(annotation.methodTask());
            }
        }

        ArrayList<String> listFormatList = new ArrayList<>();
        methods = listFormatter.getClass().getMethods();
        for (Method method : methods) {
            Format annotation = method.getAnnotation(Format.class);
            if (annotation != null) {
                listFormatList.add(annotation.methodTask());
            }
        }

        ArrayList<String> nestedList = new ArrayList<>();
        nestedList.add("Nested");

        ArrayList<String> numberFormatPatternList = FormatPatternServer.getFormatPatternServer().getNumberFormatPattern();

        ArrayList<String> dateFormatPatternList = FormatPatternServer.getFormatPatternServer().getDateFormatPattern();

        stringArrayListMap.put("String", stringFormatList);
        stringArrayListMap.put("Date", dateFormatPatternList);
        stringArrayListMap.put("Number", numberFormatPatternList);
        stringArrayListMap.put("Nested", nestedList);
        stringArrayListMap.put("List", listFormatList);

        return stringArrayListMap;

    }

    public Specification deleteSpecification(String appId) {

        MongoOperations mongoOperations = MongoOperationGenerator.getMongoOperationGenerator().getMongoOperations();
        Query query2 = new Query();
        query2.addCriteria(Criteria.where("appId").is(appId));
        Specification specification = mongoOperations.findAndRemove(query2, Specification.class, "specifications");
        return specification;

    }

}
