---
layout: default
title: OAuth 2.0 with Spotify
nav_order: 3
---

# Code flow OAuth 2.0 in Swift

When creating applications, it is quite common to use third-party services, like authentication and requests for resources. The OAuth 2.0, therefore, is a framework that enables our application to obtain access to third-party resources. All the workloads are handled by a third party and all we need to do is manage the access token of the user.

Here is an example of the authorization process of [Spotify](https://developer.spotify.com/documentation/general/guides/authorization/). In this example,  `MY APP` uses the authorization code acquired from the end-user to exchange the access token from the Spotify server.

![Untitled](Code%20flow%20%20f4499/Untitled.png)

## Code in Swift

### WebView

To visit the authorization page of Spotify, we firstly need a `webView`:

```swift

override func viewDidLoad(){
	super.viewDidLoad()
	// 1
	guard let url = AuthManager.shared.signinURL else { return }
	webView.load(URLRequest(url: url))
}

```

1. Here the `signinURL` contains the information about client ID, scope and the redirect URL
    
    ```swift
    public var signinURL: URL?{
      let scope = K.scope
      let baseURL = "https://accounts.spotify.com/authorize?"
      let urlString = "\(baseURL)response_type=code&client_id=\(K.clientID)&scope=\(scope)&redirect_uri=\(K.redirectURI)&show_dialog=TRUE"
      return URL(string: urlString)
      
    }
    ```
    
    Some parameters:
    
    `response_type`: must be set to `code` 
    
    `scope`: the range of permission we want to ask from the user.
    
    `redirect_uri`: the redirect address when the user successfully 
    