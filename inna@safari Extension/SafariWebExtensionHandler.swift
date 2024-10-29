//
//  SafariWebExtensionHandler.swift
//  inna@safari Extension
//
//  Created by 王导导 on 10/29/24.
//
import Foundation
import SafariServices
import os.log

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    func beginRequest(with context: NSExtensionContext) {
        let item = context.inputItems[0] as! NSExtensionItem
        
        let message = item.userInfo?[SFExtensionMessageKey]
        os_log(.default, "Received message from browser.runtime.sendMessage: %@", message as! CVarArg)
        
        let response = NSExtensionItem()
        response.userInfo = [ SFExtensionMessageKey: [ "Response": "Received" ] ]
        
        context.completeRequest(returningItems: [response], completionHandler: nil)
    }
}