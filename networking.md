basic terminologies
 a computer network is a digital communication medium which allows nodes to share resources 
 host is any device which gets an ip address e.g pc/laptop/server/mobile sharing data and resources in a network is know as networking.

 what is internet 
 the internet is at its core    a network of network 


 the broader picture of internet 
 nobody onws the internet and everybody owns a piece of it 
 your isp- jio,bSnl owns the cables and equiment that connect your home to the wide network they own the price 
 a data center company owns their servers and infrastructure.
 now here is big question your phone is conneted to wifi connetes to the router router conneted to isp but how does your isp in india connects to  a server sitting in the united states? 

 WWW vs. InternetThe World Wide Web is a specific application that runs on top of the internet.   In 1991, British scientist Tim Berners-Lee created a web-based system on the internet that made information accessible to everyday users.   The Core Concept:
A system of interlinked documents accessible to anyone using a web browser.   Key Innovations:HTML: The language used to structure and format web documents.   HTTP: The protocol that defines how documents are requested and delivered.   URL: The addressing system that gives every document a unique web address.  

www vs internet 
the world wide web is one specific application that runs on top of the internet.
in 1991 a british scientist name time berners-lee built something on top of the internet that changed for regular people 

his idea was simple creare a system of interlinked documents that anyone could access over the internet using a browser.

he invented three things to make this work 
html language to write and structure documents
http protocol that defines how those documentns are requested and delivered over the internet 
url system to give every document a unique address so anyone could find it. 


put those three together and you habe the web a massive collection of pages linked to each other accessible through a browser delivered over the internet using http 
so to summarise 
the internet is the infrastructure 
the world wide web is a service that runs on that infrastructure 


client-server architecture

a client is anything that makes a request 
yout browser is a client your mobile app is a client your terminal is a client 

a server is anything that listens for requests and responds to them 

A server is not some special magical machine a aserver is just a computer running software that listens on a port waiting for incoming requests and sending back responses your laptop can be a server 

client sends a request server processes ir server sends back a response 

a single server handles thousands sometimes millions of client requests simultaneously 

types of network 
your phone is connected to your home wifi right now that wifi connects to your router your router connects to jio or airtel and through them to the rest of the world 


phone-->wifi-->route--> tower--> world

but here is the thing not all of those connections are the same type of network. they have different names different scales different purposes 

and as a engineer you will here these terms constantly in cloud architecture diagrams in server configurations in security discussions so let's define them properly once and for all 

PAN 
PAN stands for personal area network 
this is the smallest scale- the network of devices around a single person 
your phone connected to your earbuds via bluetooth that is a pan 
your smartwatch syncing with your phone is a pan 
tiny range personal devices, no internet required 


LAN 
LAN stand for local area network 
it's like a mini-network  that covers a relatively small area, such as a home office building or campus
lans are perfect for sharing resources like printers,files and even communicating between devices.
later you will hear about private networks inside VPCs those are essentially lans in the cloud.


man 
man stands for metropolitan area network it's like a bigger sibling of lans 
mans cover larger geographical areas typically spanning a city or metropolitan area 
they connecy multiple lans or network segments within the same region 
mans are often used by businesses educational institutions or government organizations 
later you will encounter thr concrpt in thr cloud regions and availability zones when aws says a region hasd multiple data centres aceross a city they are essentially describing a man scale infrastructure 


wan 
wide area netework across countries 
wans cover wide geographical areas lie multiple cities countries or even continents 
the internet itself is the largest example of a wan 
but wans are not just the internet large companies have their own private wans connecting offices in mumbai bangalore new yourlondon into one unified corporate network banks do this airlines do this 

the internet is collecton of all this networks !


network topologies
imagine you're setting up wifi for a small office you have 6 computers, a printer, and one internet connection 
how do you connect them all ? do you run a cable from every computer to every other computer do u plug eveything into one centerl box ? do you arrange them in the line     
network toplogy help us to find these solutions.
 the world toplogy comes from the greak word for place or arrangement.

 in networking topology means the way devices are arranged and connected to each other 



Bus Topology

in a bus topology all devices are connected to a single cable called the bus.
it's like a group chat where everyone can see and participate in the conversation 

Ring topology 
here each device is connected to the next device in a circular loop, forming a ring data travels around the ring in one direction passing through each device 


start topology 
in this setup all devices are connected to a central hub or switch 
the hub or switch acts as the central point of connection and data flows through it to reach the intended devices 


mesh topology 

in a mesh topology each device is connected to every other device in the network 
in forms a network of interconnected paths providing multiple routes for data to travel 

tree topology 

it's a hierarchical network topology that combines elements of the bus an d start topologies 
it's like a family tree where everyone has their place in the hierarchy 


network models 

why we need models 

you are watching this bootcamp on youtube.
you opened video your phone that request somehow leaves your device travels through wifi crosses the internet reaches a server in some data center gets processed and a data comes back all in under few seconds.

your phone was made by apple the server runs linux the router in from a completely different manufacturer the isp's equipment is different again 
how do they all understand each other ? the answer is models 

in the early days of networking every company built their own system thier own cables their own rules,their own rules their own cables their own rules their own way of sending data and none of them could talk to each other.

