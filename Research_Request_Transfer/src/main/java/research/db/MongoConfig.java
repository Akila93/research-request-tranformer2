package research.db;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.AbstractCollection;

/**
 * Created by nuwantha on 8/29/16.
 */
@EnableMongoRepositories(basePackages = "org.baeldung.repository")
public class MongoConfig extends AbstractMongoConfiguration{


    @Override
    protected String getDatabaseName(){
        return "test";
    }

    @Override
    public Mongo mongo() throws Exception {
        return new MongoClient("127.0.0.1", 27017);
    }

    @Override
    protected String getMappingBasePackage() {
        return "org.baeldung";
    }

}

