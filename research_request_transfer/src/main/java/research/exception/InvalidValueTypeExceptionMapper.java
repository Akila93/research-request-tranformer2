package research.exception;

import research.models.ErrorMessage;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * Created by nuwantha on 10/27/16.
 */
@Provider
public class InvalidValueTypeExceptionMapper implements ExceptionMapper<InvalidValueTypeException> {

    @Override
    public Response toResponse(InvalidValueTypeException e) {
        ErrorMessage errorMessage = new ErrorMessage(e.getMessage(), 603, "still don't have a documentation");
        return Response.status(Response.Status.ACCEPTED).entity(errorMessage).build();
    }
}
