package com.github.mgail;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(DirectoryPickerPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
