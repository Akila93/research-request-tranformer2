package research.formatengine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import research.ResearchRequestTransferApplication;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by nuwantha on 8/29/16.
 */
public class DateFormatter implements Formatter {

    String pattern="";

    private static final Logger logger= LoggerFactory.getLogger(DateFormatter.class);

    public DateFormatter(){

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