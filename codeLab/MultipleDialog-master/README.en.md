# Implementing Fixed-Style and Custom Dialog Boxes

## Overview
This sample describes how to add custom dialog boxes and the following fixed-style dialog boxes to an application: popup, toast, date picker, text picker, and alert dialog boxes. You can use the system APIs to pass in related parameters to implement fixed-style dialog boxes. For custom dialog boxes, you can define the style and interaction mode to handle more complex scenarios.
## Preview
![](screenshots/device/MultipeDialog_en.gif)

## Project Directory
``` 
├──entry/src/main/ets                                   // Dialog box code
│  ├──entryability
│  │  └──EntryAbility.ets                               // Entry ability
│  ├──entrybackupability 
│  │  └──EntryBackupAbility.ets       
│  ├──pages                              
│  │  ├──index.ets                                      // Home page
│  │  └──PersonalInformation.ets                        // Personal information page
│  ├──utils                              
│  │  ├──CommonUtils.ets                                // Common utilities
│  │  └──Logger.ets                                     // Log printing
│  └──view
│     ├──Dialog.ets                                     // Custom dialog box
│     ├──TextCommonComponent.ets                        // Text component
│     └──TextInputComponent.ets                         // Text input component
└──entry/src/main/resources                             // Application resources
``` 

## Concepts
* Alert dialog box: an alert dialog box component, in which the text content and response callback can be set.
* Custom dialog box: a custom dialog box can be implemented using the openCustomDialog API provided by the PromptAction object obtained from UIContext.
* Date picker dialog box: a dialog box that displays a date picker based on the specified date range.
* Text picker dialog box: a dialog box that displays a text picker based on the specified selection range.
* Popup dialog box: a dialog box that can be bound to a component. You can specify its content, interaction logic, and display state. It is mainly used for screen recording and message notification.

## Permissions

N/A

## How to use
* Open the application home page. Tap the back icon in the upper left corner, and the alert dialog box is displayed. Tap OK to exit the page.
* Open the application home page. Tap the Date of birth option, and the date picker dialog box is displayed. Swipe up or down to pick a date, tap OK, and the picked date is displayed.
* Open the application home page. Tap the Gender option, and the text picker dialog box is displayed. Swipe up or down to pick an option, tap OK, and the picked text is displayed.
* Open the application home page. Tap the Hobby option, and the custom dialog box is displayed. Pick multiple hobbies, tap OK, and the picked hobbies are displayed.
* Open the application home page. Tap the menu icon in the upper right corner, and a popup dialog box is displayed. Tap Save to save the information. Then the alert dialog box is not displayed when you exit the page.

## Constrains

* The sample is only supported on Huawei phones with standard systems.
* The HarmonyOS version must be HarmonyOS 5.0.5 Release or later.
* The DevEco Studio version must be DevEco Studio 5.0.5 Release or later.
* The HarmonyOS SDK version must be HarmonyOS 5.0.5 Release SDK or later.
