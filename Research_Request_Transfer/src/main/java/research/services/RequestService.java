package research.services;


import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import research.db.MongoOperationGenerator;
import research.models.Beam;
import research.models.Request;
import research.models.Specification;
import research.formatengine.*;

/**
 * Created by akila on 8/30/16.
 */
public class RequestService {
    public Request handleRequest(Request request) {

        MongoOperationGenerator generator = MongoOperationGenerator.getMongoOperationGenerator();
        Query query = new Query().limit(1);
        query.addCriteria(
                Criteria.where("appId").is(request.getAppId())
        );
        System.out.println(request.getAppId());
        Specification specification=generator.getMongoOperations().find(query,Specification.class,"specifications").get(0);

        RequestTransformer transformer=new RequestTransformer(specification);
        request.setRequestBody(transformer.transform(request.getRequestBody()));

        return request;
    }

    public Request handleRequestPreview(Beam beam) {
        RequestTransformer transformer=new RequestTransformer(beam.getSpecification());
        beam.getRequest().setRequestBody(transformer.transform(beam.getRequest().getRequestBody()));
        return beam.getRequest();
    }
}
