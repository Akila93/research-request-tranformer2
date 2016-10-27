package research.exception;

import research.models.ErrorMessage;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * Created by nuwantha on 10/26/16.
 */
@Provider
public class GenericExceptionMapper implements ExceptionMapper<Throwable> {

    @Override
    public Response toResponse(Throwable throwable) {
        ErrorMessage errorMessage = new ErrorMessage(throwable.getMessage(), 600, "still don't have documentation");
        return Response.status(Response.Status.NOT_IMPLEMENTED).entity(errorMessage).build();
    }
}
