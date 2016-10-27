package research.models;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by nuwantha on 10/26/16.
 */

@XmlRootElement
public class ErrorMessage {

    String errorMessage;
    int errorCode;
    String documatation;

    public ErrorMessage(){

    }

    public ErrorMessage(String errorMessage, int errorCode, String documatation) {
        super();
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.documatation = documatation;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getDocumatation() {
        return documatation;
    }

    public void setDocumatation(String documatation) {
        this.documatation = documatation;
    }

}
