# ZipZap app
This is a simple application for shortening URL addresses.
# How to test?
1) git clone https://github.com/nazary001/zipzap.git
2) npm install
3) npm run start
# Description
As the task specified creating a prototype, this application demonstrates my understanding of how this simple system should function on a small scale.  
The application consists of 2 requests:

1) POST - The logic of this function is quite simple. We accept the original link from the user, then generate a unique ID prefix for our future link. We store the data in the form of an object with the key being the generated ID and the value being the original link. Finally, we provide the user with a fully unique shortened link.  
2) GET - We receive the unique link identifier from the user, then locate the corresponding original link in our object. If such a link exists, we redirect the user to it.  

# Note  
The application merely demonstrates my conceptual understanding of how such services operate. It requires significant enhancements to be ready for real-world usage, such as database integration, numerous additional logic and validations, and so on. Additionally, it is designed to handle light user loads.

# Part 2  
Let's consider a scenario where the load on the application increases to 10,000 or 100,000 requests per second, as stated in the task.  
In this case, we have 2 challenges:  
1) Provide enough unique links for users.  
2) Ensure stable operation of the server under heavy load.  
  
To provide enough unique links for users we need:  
1) Choose the optimal length of our link from the estimated number of requests.
2) Choose the optimal TTL(time to live) for our links.

To ensure stable operation of the server under heavy load we need:  
1) Optimize our server and perform load balancing.
2) Use horizontal or vertical scaling of our server depending on our needs.

Let's consider the implementation of this application if we have approximately 100,000 requests per second.  
In this case, our objects in the database should look something like this:  
```
{  
  id: string,  
  originalUrl: string,  
  shortUrl: string,  
  createdAt: date,  
  opensCount: number,  
  lastOpenDate: date  
}
```
Further, for example, if we use lowercase and uppercase letters as well as numbers as our alphabet and make the link length equal to 10 characters, then the number of possible combinations of unique links will be 839299365868340224.
Let's calculate how long this number of combinations is enough for us.  
839299365868340224/100000/60/60/24/365 ~ 266140  
It turns out that without using TTL, we will be able to ensure the operation of our site for about a 266140 years.  
This number might seem quite large, but it's important to consider that as the number of generated links increases, the likelihood of our application generating two identical short links for different original links also increases.  
After calculating the probability of the same link dropping out, we can understand that approximately every 266,000 users will generate the same short link that is not suitable for our application.  
From this example, we can understand that we need to find a balance between the acceptable probability of generating identical links and the number of characters in our short link.  
After making calculations, I found that the optimal length of the link under such a load would be 21.  
From my calculation, it turns out that if we use lowercase, uppercase letters and numbers with TTL 1 year duplication will occur for every 243819667982231 users, which with our load 1 time in 77 years.  
Is it suitable for our application? This should be asked from our customer. We need to find out what TTL he wants to have in his application and what load the application will expect.  
# Result  
The idea is to choose the optimal balance between the number of characters in our short link and the lifetime of the link. It is also necessary to take into account the calculated load on our application and implement the appropriate functionality for the client's needs.






 




