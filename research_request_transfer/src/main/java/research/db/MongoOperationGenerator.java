package research.db;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.BasicQuery;
import research.ResearchRequestTransferApplication;
import research.models.Specification;

/**
 * Created by nuwantha on 8/29/16.
 */
public class MongoOperationGenerator {

    private static MongoOperationGenerator mongoOperationGenerator;
    private static MongoOperations mongoOperations;
    private static final Logger logger= LoggerFactory.getLogger(MongoOperationGenerator.class);


    private MongoOperationGenerator(){
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MongoConfig.class);
         this.mongoOperations = (MongoOperations)ctx.getBean("mongoTemplate");
    }


    public static MongoOperationGenerator getMongoOperationGenerator()  {
        if (mongoOperationGenerator == null) {
            mongoOperationGenerator = new MongoOperationGenerator();
        }
        return mongoOperationGenerator;
    }

    public MongoOperations getMongoOperations() {
        return mongoOperations;
    }

}
