---
layout: default
title: UICollectionView Layout
nav_order: 3
---

# The Compositional UICollectionView Layout

According to Apple’s document, UICollectionView is an object that manages an ordered collection of data with customizable layouts. The key here is the customizable layouts, which means you can define some crazy layouts with the UICollectionView.

### Basic layout

One of the basic collection view layouts is `UICollectionViewFlowLayout`. Depending on the scrolling direction (by the way, `UICollectionView` is inherited from `UIScrollView`), each element will be presented on the screen one by one in a column or row.

Here is a simple example. We firstly define a basic `UICollectionView` and set it `collectionViewLayout` property to `UICollectionViewFlowLayout()`.

```swift
private let collectionView = UICollectionView(frame: .zero, 
collectionViewLayout: UICollectionViewFlowLayout())
```

<img src="The%20Compos%202c7bc/Untitled.png" alt="drawing" width="300"/>

### UICollectionViewCompositionalLayout

As said, we can also define our own collection view layout. What we need here is the `UICollectionViewCompositionalLayout`, which consists of three parts: item, group, and section.

Here is a simple example:

```swift
let item = NSCollectionLayoutItem(layoutSize: NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(2/3),
            heightDimension: .fractionalHeight(1)))
```

When creating the item object we need to specify the layout size. We can use absolute value for the size of the fractional size, which means the percentage of the space of the parent view.

With saying that, what we want to achieve is something like this:

<img src="The%20Compos%202c7bc/Untitled%201.png" alt="drawing" width="400"/>

The red rectangle is the item we defined above. The two blue rectangles, each of which is an item, formed a vertical group. Here is the code:

```swift
let verticalStackItem = NSCollectionLayoutItem(layoutSize: NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(1),
            heightDimension: .fractionalHeight(0.5))
)

let verticalStackGroup = NSCollectionLayoutGroup.vertical(layoutSize: NSCollectionLayoutSize(						     widthDimension: .fractionalWidth(1/3),								heightDimension: .fractionalHeight(1)), 
								subitem: verticalStackItem, 								count: 2)
```

Here `count: 2` means we want two `verticalStackItem` in this group.

After defining the vertical group, we need another group to combine the item and the vertical group:

```swift
let horizontal = NSCollectionLayoutGroup.horizontal(layoutSize: NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(1),
            heightDimension: .fractionalHeight(0.3)), subitems: [item, verticalStackGroup])
```

Then we define a section with the group variable defined above and return the layout finally.

```swift
let section = NSCollectionLayoutSection(group: horizontal)
return UICollectionViewCompositionalLayout(section: section)
```

Here is what the UI looks like now:

<img src="The%20Compos%202c7bc/Untitled%202.png" alt="drawing" width="300"/>

From here, we can even combine more groups together to create a more complex layout. This is what we want to achieve:

![Untitled](The%20Compos%202c7bc/Untitled%203.png)

To achieve this layout, all we need to do is add a new group with three items lined horizontally.

```swift
// Define the yellow rectangles
let tripletItem = NSCollectionLayoutItem(layoutSize: NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(1/3),
            heightDimension: .fractionalHeight(1)
))

let tripletHorizontalGroup = NSCollectionLayoutGroup.horizontal(
            layoutSize: NSCollectionLayoutSize(
                widthDimension: .fractionalWidth(1),
						// we also need to change to the heightDimension of the horizontal group to 0.5
                heightDimension: .fractionalHeight(0.5)
            ),
            subitem: tripletItem,
            count: 3)

// combine the two groups together
let verticalGroup = NSCollectionLayoutGroup.vertical(
            layoutSize: NSCollectionLayoutSize(widthDimension: .fractionalWidth(1), h					eightDimension: .fractionalHeight(0.3)),
            subitems: [horizontal, tripletHorizontalGroup]
        )
```

This is what it looks like now:

<img src="The%20Compos%202c7bc/Untitled%204.png" alt="drawing" width="300"/>