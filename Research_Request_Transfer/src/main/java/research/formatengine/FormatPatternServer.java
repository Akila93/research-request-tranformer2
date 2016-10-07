package research.formatengine;

import java.util.ArrayList;
import java.util.Arrays;


/**
 * Created by nuwantha on 8/29/16.
 */


public class FormatPatternServer {
    private static ArrayList<String> dateFormatPattern=new ArrayList<>();
    private static ArrayList<String> numberFormatPattern=new ArrayList<>();
    private static FormatPatternServer formatPatternServer;

    private FormatPatternServer() {

        String[] datePattern = new String[] {"dd-MM-yy","dd-MM-yy","MM-dd-yyyy","yyyy-MM-dd","yyyy-MM-dd HH:mm:ss","yyyy-MM-dd HH:mm:ss.SSS"};
        dateFormatPattern.addAll(Arrays.asList(datePattern));

        String[] numberPattern = new String[] {"###,###.###","###,###.##","000000.000","$###,###","$###,###.000","-###,###.000","-###,###"};
        numberFormatPattern.addAll(Arrays.asList(numberPattern));
    }

    public static FormatPatternServer getFormatPatternServer() {
        if (formatPatternServer == null) {
            formatPatternServer = new FormatPatternServer();
        }
        return formatPatternServer;
    }



    public ArrayList<String> getDateFormatPattern(){
        return dateFormatPattern;
    }

    public ArrayList<String> getNumberFormatPattern(){
        return numberFormatPattern;
    }



}
