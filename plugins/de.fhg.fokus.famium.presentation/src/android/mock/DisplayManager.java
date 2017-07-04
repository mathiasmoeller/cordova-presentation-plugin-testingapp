package mock;

import java.util.List;

/**
 * Created by Lo on 19.06.2017.
 */
public class DisplayManager {
    public static int DISPLAY_CATEGORY_PRESENTATION = 1;

    public void unregisterDisplayListener(DisplayListener cdvPresentationPlugin) {
    }

    public void registerDisplayListener(DisplayListener cdvPresentationPlugin, Object o) {

    }

    public Display getDisplay(int displayId) {
        return null;
    }

    public interface DisplayListener {
    }
    public List<Display> getDisplays(int type)
    {
        return null;
    }
}
