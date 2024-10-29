//
//  SafariWebExtensionHandler.swift
//  inna@safari Extension
//
//  Created by 王导导 on 10/29/24.
//
import Foundation
import SafariServices
import os.log

// Safari Web 扩展处理类
class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    
    // 处理扩展请求的方法
    func beginRequest(with context: NSExtensionContext) {
        // 获取输入项（来自 JavaScript 的消息）
        let item = context.inputItems[0] as! NSExtensionItem
        
        // 创建响应项
        let response = NSExtensionItem()
        
        // 完成请求处理
        // 参数1: 返回的项目数组
        // 参数2: 完成回调（这里为空）
        context.completeRequest(returningItems: [response], completionHandler: nil)
    }
}