package com.github.mgail;

import android.content.Context;
import android.os.Build;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MaterialColor")
public class MaterialColor extends Plugin {
    @PluginMethod
    public void getSourceColor(PluginCall pluginCall) {
        JSObject result = new JSObject();
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
            result.put("source", "#8bc34a");
            pluginCall.resolve(result);
            return;
        }

        Context context = getContext();
        int color = context.getColor(android.R.color.system_accent1_600);
        result.put("source", String.format("#%06x", color));
        pluginCall.resolve(result);
    }
}
