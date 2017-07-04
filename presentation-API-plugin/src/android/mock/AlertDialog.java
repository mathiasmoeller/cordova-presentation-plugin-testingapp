package mock;

import java.util.List;

/**
 * Created by Lo on 19.06.2017.
 */
public class AlertDialog {
    public void show() {
    }

    public static class Builder
    {

        private String title;

        public Builder(Activity activity) {
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }
        public Builder setItems(List<Object> items, OnClickListener onClickListener)
        {
            return this;
        }

        public String getTitle() {
            return title;
        }

        public AlertDialog create() {
        }

        private class OnClickListener {
        }
    }
}
