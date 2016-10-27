package research.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by akila on 9/29/16.
 */

public class PreviewRequest {

    private Request request;
    private Specification specification;
    private static final Logger logger= LoggerFactory.getLogger(PreviewRequest.class);

    @JsonProperty
    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    @JsonProperty
    public Specification getSpecification() {
        return specification;
    }

    public void setSpecification(Specification specification) {
        this.specification = specification;
    }
}
