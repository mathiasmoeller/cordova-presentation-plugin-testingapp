package de.fhg.fokus.famium.presentation;

import android.app.Activity;
import android.app.Presentation;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.Display;
import android.view.ViewGroup.LayoutParams;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by Lo on 20.06.2017.
 */
public class NoPresentation extends SecondScreenPresentation {
    public NoPresentation() {
        super(null, null, null);
    }

    protected void onCreate(Bundle savedInstanceState) {
    }

    protected void onStop() {
    }

    public WebView getWebView() {
        return null;
    }

    public PresentationSession getSession() {
        return null;
    }

    public void setSession(PresentationSession session) {
    }

    public Activity getOuterContext() {
        return null;
    }

    public void loadUrl(final String url){
    }
    public String getDisplayUrl() {
        return null;
    }

    public void terminate(){ }
}
