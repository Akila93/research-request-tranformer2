package research;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import research.exception.*;
import research.resources.RequestResource;
import research.resources.SpecificationResource;

import javax.annotation.PostConstruct;

public class ResearchRequestTransferApplication extends Application<ResearchRequestTransferConfiguration> {

    private SpecificationResource specificationResource;
    private RequestResource requestResource;


    public void setSpecificationResource(SpecificationResource specificationResource) {
        this.specificationResource = specificationResource;
    }

    public void setRequestResource(RequestResource requestResource) {
        this.requestResource = requestResource;
    }

    @PostConstruct
    public void init() throws Exception {

        String args[] = new String[]{"server", "/home/nuwantha/HsenidResearch/version 15/request-transformer/research_request_transfer/src/main/resources/server-config.yml"};
        run(args);
    }

    @Override
    public String getName() {
        return "Research_Request_Transfer";
    }

    @Override
    public void initialize(final Bootstrap<ResearchRequestTransferConfiguration> bootstrap) {
        // TODO: application initialization
    }

    @Override
    public void run(final ResearchRequestTransferConfiguration configuration,
                    final Environment environment) {
        environment.jersey().register(specificationResource);
        environment.jersey().register(requestResource);
        environment.jersey().register(DataNotFoundExceptionMapper.class);
        environment.jersey().register(GenericExceptionMapper.class);
        environment.jersey().register(InvalidValueFormatterExceptionMapper.class);
        environment.jersey().register(InvalidValueTypeExceptionMapper.class);
    }

}
