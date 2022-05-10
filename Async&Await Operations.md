---
layout: default
title: Async and Await Operations
nav_order: 4
---

# Async and Await Operations

Swift 5.5 introduces the `Async` and `Await` operations. Basically, you can use this pattern to replace the tasks that used to be handled by the `completion` block.

For example, consider we want to fetch data from an URL. Normally, we would like to write a function like this:

```swift
private func fetchDataWithCompletionBlock(completion: @escaping ([User]) -> Void){
        guard let url = URL(string: urlString) else {
            completion([])
            return
        }
        
        let task = URLSession.shared.dataTask(with: url) { data, _, error in
            guard let data = data, error == nil else {
                completion([])
                return
            }
            
            do{
                let jsonData = try JSONDecoder().decode([User].self, from: data)
                completion(jsonData)
            }catch{
                completion([])
            }
        }
        
        task.resume()
    }
```

With `Async` and `Await` operations, we can re-write the function above to this:

```swift
private func fetchData() async -> [User]{ // 1
        guard let url = URL(string: urlString) else { return [] }
        
        do{
            let (data, _) = try await URLSession.shared.data(from: url) // 2
            let jsonData = try JSONDecoder().decode([User].self, from: data)
            print("Debug: json data -> \(jsonData)")
            return jsonData
        }catch{
            return []
        }
    }
```

1. To write an async function we need to specify the function with the `async` keyword
2. The `await` keyword is used for calling the async method `URLSession.shared.data`

After that, we can call this async function in the `viewDidLoad()` method:

```swift
override func viewDidLoad() {
  Task.init { // 1
      users = await fetchData() // 2
      tableView.reloadData()
  }
}
```

1. If we want to run operations asynchronously we need to call them in the `Task.init` block.
2. As I said above, we need the `await` keyword to call the asynchronous function.