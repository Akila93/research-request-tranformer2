package research;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import research.resources.RequestResource;
import research.resources.SpecificationResource;

public class ResearchRequestTransferApplication extends Application<ResearchRequestTransferConfiguration> {

    public static void main(final String[] args) throws Exception {
        new ResearchRequestTransferApplication().run(args);
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


        final SpecificationResource specificationResource = new SpecificationResource();
        final RequestResource requestResource = new RequestResource();
        environment.jersey().register(specificationResource);
        environment.jersey().register(requestResource);

        // TODO: implement application
    }

}
