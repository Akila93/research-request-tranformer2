package research.formatengine;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by nuwantha on 8/29/16.
 */
public class DateFormatter {

    String pattern="";

    public DateFormatter(String pattern){
        this.pattern=pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public String format(Date date) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String newVersion = simpleDateFormat.format(date);
        return newVersion;
    }

}