---
title:  "Musings about Cats, Dogs and Machine Learning"
header:
  image: assets/images/robot_reading_book.jpg
  caption: "Photo credit: [**User D4N13l3 on DeviantArt**](http://d4n13l3.deviantart.com/art/do-androids-read-Robot-book-325505227)"
  teaser: assets/images/robot_reading_book.jpg
excerpt: "An interactive story to introduce the area of machine learning to beginners."
categories:
  - data-science
---

Over the past few weeks, I've had people from several walks of life ask about my research. I've always had to tailor my answer to the person asking the question. When my mother would ask me, I would always say "We'll talk about it later". Asked by my brother, an engineer, I would make sure that the description would be more apt, such as "I'm linking large noisy datasets together to discover the same entities, with the goal of analyzing them". Asked by an elderly friend, the reply would promptly be "Same old. Trying to teach a computer to do my bidding."

Machine Learning and Data Mining have become buzzwords of the Information Age. They have aroused curiosity, and confusion. Interest, and fear. Admiration, and misinformation.

Recently, fate had me try to explain Machine Learning to one of my friends who feared and loathed math. My failure to provide a coherent explanation that would satisfy him got me thinking hard about how I could explain Machine Learning in the simplest manner possible to the uninitiated.

A while later, I found myself on Facebook, staring at pictures of cats. And the occasional dog. And it was then that my brain cooked up a simple explanation of Machine Learning that I wished somebody'd told me.

Let me illustrate with a short, interactive story. Assume that you live in Canada. You assumed Mother Nature would be kind to you in April, and wore your running shoes. Bad move, freezing rain overnight has made the sidewalks precarious. You walk merrily, oblivious of impending danger. Suddenly, you slip and fall. You wake up in a hospital, and the nurse tells you that you're suffering from memory loss.

To judge the extent of your memory loss and normalcy of cognitive functions, the nurse shows you pictures of cats and dogs and asks you to identify the animal. Oops, you have no idea what these hairy, four legged animals are called! You must now learn what cats look like, and what dogs look like.

Consider three scenarios:

1. The nurse shows you example pictures of cats and dogs and identifies them for you. You notice some cats that fairly resemble dogs, and dogs that fairly resemble cats. Then, she shows you a much larger sample of pictures in random order and asks you to identify them. Since you've already been "trained" on what cats and dogs look like, you're able to identify them with ease. This is an example of *Supervised Machine Learning*.

2. The nurse tells you nothing about what cats and dogs look like, but asks you to group the animals into two groups based on similarities in their appearance. You notice that cats are generally smaller, have whiskers and are cuter. You classify the animals into a pile of cats, and another pile of dogs. Proud of yourself, you turn to the nurse. She doesn't look too happy, however. She says that you incorrectly classified some dogs as cats and some cats and dogs, because they were extremely similar! This is an example of *Unsupervised Machine Learning*.

3. The nurse shows you a small number of pictures of cats and dogs and a much larger number of unlabeled pictures. You are then allowed to show the nurse a *maximum* of three unlabeled pictures, and request her to identify them. Once done, she asks you to use both your intuition and your observations from the labeled pictures to identify the rest. When presented with the remaining pictures of cats and dogs, you classify them better than when you knew nothing about them, but not as accurately as you did when you were shown a *lot* of pictures of them. This is an example of *Semi-Supervised Machine Learning*.


Great. Now you know again what cats and dogs look like, and now you can get back to googling and ogling them (for some reason, facebooking and ogling just didn't sound right).


Now imagine that the nurse is you, and "you" is the computer. And the computer can identify a lot more than cats and dogs with extremely high precision, but you must first teach it how to.


Welcome, fellow apprentice, to the world of Machine Learning.
