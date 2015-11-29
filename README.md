# isomorphic-react-dynamodb-example
This repo was my second attempt (first public) at isomorphic react. I eventually solved the issues I was dealing with, but after taking
a more informed look at my options, I decided I would use Fluxible for the project I am working on. The big lesson I learned from this
is that middleware between your data and your React views that works on both the client and the server is really helpful to make isomorphic 
react work. [Fetchr](https://github.com/yahoo/fetchr) seems like a pretty nice approach and it is what I will be using.

The reason this is a good idea is that right now async calls do not work on the server, which means that you have to get your data first and
then generate the view synchonously . This is fine even if it is slow, especially since you can eventually cache these
views. The problem is that you are definitely going to want async calls within your React components, and therefore will
not be able to use the same React view on the client as on the server without some kind of workaround when mounting. See React issue [1739](https://github.com/facebook/react/issues/1739).

The obvious solution is to simply pass the server generated view all the data it needs before it is rendered, and then on the client
make the asynchronous calls you need with some kind of mixin (or vice versa). However, things get overly complicated again when you mount 
the same component on the client that you just rendered on the server. You don't want to make these async calls, which means you have
three different mounting conditions: one on the server, one on the inital client mounting (where there is no new data), and one with every
subsequent mounting on the client where new data is needed.

Yes this is solvable without much code (check out the repo), but I don't believe it is worth doing this to yourself as the data layer of
your application is going to get messy. With all of the complexities the issue introduces a solution like Fletchr starts to make a lot of
sense.

The package.json is extremly long and preserves a history of all of the libraries that I tried to use to make this work.
