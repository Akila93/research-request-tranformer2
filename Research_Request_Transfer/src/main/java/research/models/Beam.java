package research.models;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by akila on 9/29/16.
 */
public class Beam {
    private Request request;
    private Specification specification;

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
