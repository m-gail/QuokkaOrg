package com.github.mgail;

import android.content.Context;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MaterialColor")
public class MaterialColor extends Plugin {
    @PluginMethod
    public void getSourceColor(PluginCall pluginCall) {
        Context context = getContext();
        int color = context.getColor(android.R.color.system_accent1_600);
        JSObject result = new JSObject();
        result.put("source", String.format("#%06x", color));
        pluginCall.resolve(result);
    }
}
