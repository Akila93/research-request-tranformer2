import research.annotation.Format;

import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.lang.model.element.Element;
import javax.lang.model.element.TypeElement;
import java.util.Set;

/**
 * Created by nuwantha on 10/19/16.
 */
@SupportedAnnotationTypes("research.annotation.Format.class")
public class A extends AbstractProcessor{
    @Override
    public boolean process(Set<? extends TypeElement> set, RoundEnvironment roundEnvironment) {
        Set<? extends Element> elementsAnnotatedWith = roundEnvironment.getElementsAnnotatedWith(Format.class);
        System.out.println(elementsAnnotatedWith.toString());
        System.out.println("mamamammam");
        return false;
    }
}
