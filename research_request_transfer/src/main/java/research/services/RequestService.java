package research.services;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import research.db.MongoOperationGenerator;
import research.exception.DataNotFoundException;
import research.formatengine.RequestTransformer;
import research.models.PreviewRequest;
import research.models.Request;
import research.models.Specification;

import java.util.List;

/**
 * Created by akila on 8/30/16.
 */


public class RequestService {

    RequestTransformer transformer;

    private static final Logger logger = LoggerFactory.getLogger(RequestService.class);


    public void setTransformer(RequestTransformer transformer) {
        this.transformer = transformer;
    }

    public Request handleRequest(Request request) {
        logger.info("requestService.handleRequest is called");

        MongoOperationGenerator generator = MongoOperationGenerator.getMongoOperationGenerator();
        Query query = new Query().limit(1);
        query.addCriteria(
                Criteria.where("appId").is(request.getAppId())
        );

        logger.info("app id of request is " + request.getAppId());
        List<Specification> specifications = generator.getMongoOperations().find(query, Specification.class, "specifications");

        if (specifications.size() != 0) {
            transformer.setSpecification(specifications.get(0));
        } else {
            throw new DataNotFoundException("no specification for appId : " + request.getAppId());
        }
        request.setRequestBody(transformer.transform(request.getRequestBody()));
        return request;
    }

    public Request handleRequestPreview(PreviewRequest beam) {

        logger.info("requestService.handleRequestPreview is called");

        transformer.setSpecification(beam.getSpecification());
        beam.getRequest().setRequestBody(transformer.transform(beam.getRequest().getRequestBody()));
        return beam.getRequest();
    }
}
