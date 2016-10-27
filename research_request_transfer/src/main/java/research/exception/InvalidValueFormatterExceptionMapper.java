package research.exception;

import research.models.ErrorMessage;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

/**
 * Created by nuwantha on 10/26/16.
 */
public class InvalidValueFormatterExceptionMapper implements ExceptionMapper<InvalidValueFormatterException> {
    @Override
    public Response toResponse(InvalidValueFormatterException e) {
        ErrorMessage errorMessage = new ErrorMessage(e.getMessage(), 602, "still don't have documentation");
        return Response.status(Response.Status.NOT_ACCEPTABLE).entity(errorMessage).build();
    }
}
