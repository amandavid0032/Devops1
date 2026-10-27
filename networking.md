# 🌐 Networking — Complete Notes (Basics → Topologies → OSI → TCP/IP → Devices → IP Addressing → Subnetting → NAT → Routing & ICMP → Interview)

> One file for networking fundamentals every DevOps / Cloud engineer needs: terminology, the Internet vs the Web, client-server, network types, topologies, the OSI model (all 7 layers), the TCP/IP model, how data travels, interview answers and cheat sheets.
>
> **How to read this file:** go top to bottom — each part builds on the previous one. 💡 boxes connect the concept to **cloud / DevOps** (AWS, Docker, servers).

---

## 📑 Table of Contents

- **Part 1 — Networking Basics** (§1–4)
- **Part 2 — Types of Networks** (§5–9)
- **Part 3 — Network Topologies** (§10–16)
- **Part 4 — Network Models** (§17–19)
- **Part 5 — OSI Model (7 Layers), Encapsulation & PDU** (§20–31)
- **Part 6 — TCP/IP Model** (§32–35)
- **Part 7 — Message Delivery** (§36–41)
- **Part 8 — Network Devices, ISPs, Firewall & Host-to-Host** (§42–52)
- **Part 9 — Network Layer & IP Addressing** (§53–57)
- **Part 10 — Subnetting & CIDR** (§58–62)
- **Part 11 — IP Packet & NAT** (§63–66)
- **Part 12 — Routing Scenarios & ICMP** (§67–71)
- **Part 13 — Interview Quick Answers** (§72)
- **Part 14 — Cheat Sheets & Mental Model** (§73–75)

---

# 🟦 PART 1 — Networking Basics

## 1. 📖 Basic Terminologies

**A computer network** is a digital communication medium that allows **nodes** (devices) to **share data and resources**.

```text
Networking = sharing data and resources over a network
```

| Term | Meaning | Example |
|---|---|---|
| **Network** | Devices connected together to share data/resources | Your home Wi-Fi |
| **Node** | Any device connected to a network | Laptop, printer, router |
| **Host** | Any device that gets an **IP address** | PC, laptop, server, mobile |
| **Networking** | Sharing data and resources in a network | Sending a file, opening a website |

---

## 2. 🌍 What is the Internet?

> 🌐 **The Internet is, at its core, a network of networks.**

Millions of small networks (homes, offices, data centers, ISPs) are connected together to form one giant global network.

### Who owns the Internet?

> **Nobody owns the Internet — and everybody owns a piece of it.**

| Who | What they own |
|---|---|
| 📡 **Your ISP** (Jio, Airtel, BSNL) | Cables & equipment connecting your home to the wider network |
| 🏢 **Data center companies** (AWS, Google, Azure) | Their servers and infrastructure |
| 🌊 **Undersea cable companies** | Fiber cables on the ocean floor connecting continents |

### ❓ The big question

```text
📱 Phone → 📶 Wi-Fi → 🔀 Router → 📡 ISP (India) → ??? → 🖥️ Server (USA)
```

How does your ISP in India reach a server in the United States?

✅ ISPs connect to **bigger ISPs**, which connect to each other through **undersea fiber-optic cables** and **Internet Exchange Points (IXPs)**. Data hops from network to network until it reaches the destination.

---

## 3. 🆚 Internet vs World Wide Web (WWW)

> ⚠️ They are **NOT** the same thing.

The **World Wide Web** is **one specific application** that runs **on top of** the Internet.

In **1991**, British scientist **Tim Berners-Lee** built a system on top of the Internet that made information accessible to regular people.

**His idea:** a system of **interlinked documents** that anyone could access over the Internet using a **browser**.

### 🧩 He invented 3 things to make it work

| Invention | Full form | Job |
|---|---|---|
| 📝 **HTML** | HyperText Markup Language | Language to write and structure documents |
| 🔄 **HTTP** | HyperText Transfer Protocol | Rules for how documents are requested and delivered |
| 🔗 **URL** | Uniform Resource Locator | A unique address for every document so anyone can find it |

```text
HTML + HTTP + URL = The Web 🌐
→ a massive collection of linked pages, opened in a browser,
  delivered over the Internet using HTTP
```

### Summary

| 🌍 Internet | 🕸️ World Wide Web |
|---|---|
| The **infrastructure** (cables, routers, networks) | A **service** that runs on that infrastructure |
| Carries web, email, video calls, SSH, gaming... | Only web pages opened in a browser |
| = the **roads** 🛣️ | = **cars** driving on the roads 🚗 |

---

## 4. 🖥️ Client-Server Architecture

| 👤 Client | 🖥️ Server |
|---|---|
| Anything that **makes a request** | Anything that **listens** for requests and **responds** |
| Browser, mobile app, terminal (`curl`) | Web server (Nginx, Apache), DB server, API |

```text
CLIENT ──── 1. request ────▶ SERVER
                             2. processes it
CLIENT ◀─── 3. response ──── SERVER
```

### Key points

- ✅ A server is **not a special magical machine** — it's just a computer running software that **listens on a port**, waiting for requests and sending back responses.
- ✅ **Your laptop can be a server** too.
- ✅ A single server can handle **thousands, sometimes millions** of client requests at the same time.

> 💡 **DevOps link:** `docker run -p 8080:80 nginx` turns your laptop into a web server listening on port 8080.

---

# 🟩 PART 2 — Types of Networks

Your phone right now:

```text
📱 Phone → 📶 Wi-Fi → 🔀 Router → 📡 Tower (Jio/Airtel) → 🌍 World
```

Not all of these connections are the **same type** of network — they have different names, scales and purposes. You'll hear these terms constantly in **cloud architecture diagrams, server configs and security discussions**.

## 5. 📱 PAN — Personal Area Network

- **Smallest** scale — the network of devices around **a single person**.
- Tiny range, personal devices, **no Internet required**.

**Examples:**
- 🎧 Phone ↔ Bluetooth earbuds
- ⌚ Smartwatch syncing with your phone

---

## 6. 🏠 LAN — Local Area Network

- A **mini-network** covering a **small area**: home, office building, campus.
- Perfect for **sharing resources** — printers, files — and communication between devices.

> 💡 **Cloud link:** private networks inside a **VPC** (Virtual Private Cloud) are essentially **LANs in the cloud**.

---

## 7. 🏙️ MAN — Metropolitan Area Network

- The **bigger sibling of LAN** — covers a **city / metropolitan area**.
- Connects **multiple LANs** or network segments within the same region.
- Used by businesses, educational institutions and government organizations.

> 💡 **Cloud link:** when AWS says a **Region** has multiple data centers (**Availability Zones**) across a city, that's **MAN-scale** infrastructure.

---

## 8. 🌍 WAN — Wide Area Network

- Covers **multiple cities, countries or even continents**.
- 🌐 **The Internet is the largest WAN.**
- WANs are not just the Internet — big companies build **private WANs**. Example: a bank connecting offices in **Mumbai, Bangalore, New York and London** into one corporate network. Banks and airlines do this.

---

## 9. 📊 Network Types Summary

```text
PAN   <   LAN   <   MAN   <   WAN
👤        🏠        🏙️        🌍
person   building   city     world
```

| Type | Full form | Area | Example | ☁️ Cloud equivalent |
|---|---|---|---|---|
| PAN | Personal Area Network | Few meters | Phone + earbuds | — |
| LAN | Local Area Network | Home / office / campus | Office Wi-Fi | VPC / subnet |
| MAN | Metropolitan Area Network | City | City-wide bank branches | Region + AZs |
| WAN | Wide Area Network | Countries / continents | The Internet | Multi-region setup |

> 🌐 **The Internet is a collection of all these networks!**

---

# 🟨 PART 3 — Network Topologies

## 10. 📖 What is a Topology?

**Scenario:** you're setting up Wi-Fi for a small office — **6 computers, 1 printer, 1 Internet connection**. How do you connect them?

- ❓ Run a cable from every computer to every other computer?
- ❓ Plug everything into one central box?
- ❓ Arrange them in a line?

**Network topology** helps us answer this.

> 📖 The word *topology* comes from the Greek word for **place / arrangement**.
> In networking, **topology = the way devices are arranged and connected to each other.**

---

## 11. 🚌 Bus Topology

All devices are connected to **a single cable** called the **bus**.

```text
 PC1    PC2    PC3    PC4
  │      │      │      │
══╧══════╧══════╧══════╧══   ← single cable (bus)
```

- 💬 Like a **group chat** — everyone can see and participate in the conversation.
- ✅ Cheap and simple
- ❌ If the main cable breaks → the **whole network goes down**

---

## 12. 💍 Ring Topology

Each device is connected to the **next device** in a **circular loop**. Data travels around the ring in **one direction**, passing through each device.

```text
   PC1 ───▶ PC2
    ▲        │
    │        ▼
   PC4 ◀─── PC3
```

- ✅ Orderly data flow
- ❌ One broken device/link can **break the ring**

---

## 13. ⭐ Star Topology (most common)

All devices are connected to a **central hub or switch**. Data flows **through** it to reach the intended device.

```text
          PC1
           │
  PC4 ── SWITCH ── PC2
           │
          PC3
```

- ✅ Easy to add/remove devices; one PC failing doesn't affect others
- ❌ If the **central switch fails** → everything goes down
- 🏠 Your home router setup is a star topology

---

## 14. 🕸️ Mesh Topology

**Every device is connected to every other device**, forming many interconnected paths → **multiple routes** for data.

```text
PC1 ─────── PC2
 │ ╲       ╱ │
 │   ╲   ╱   │
 │     ╳     │
 │   ╱   ╲   │
 │ ╱       ╲ │
PC4 ─────── PC3
```

- ✅ Very reliable — no single point of failure
- ❌ Expensive — lots of cables/connections

---

## 15. 🌳 Tree Topology

A **hierarchical** topology that combines **bus + star**.
👨‍👩‍👧‍👦 Like a **family tree** — everyone has their place in the hierarchy.

```text
                ROOT
              ╱      ╲
        SWITCH 1    SWITCH 2
         ╱   ╲        ╱   ╲
       PC1   PC2    PC3   PC4
```

- ✅ Scalable, good for large organizations
- ❌ If the root fails → branches get cut off

---

## 16. 📊 Topology Comparison

| Topology | Structure | Cost | Reliability | Used where |
|---|---|---|---|---|
| 🚌 Bus | One shared cable | Low | Low | Old / tiny networks |
| 💍 Ring | Circular loop | Medium | Low–Medium | Old token-ring networks |
| ⭐ Star | Central switch | Medium | Medium–High | Homes, offices (most common) |
| 🕸️ Mesh | Everyone ↔ everyone | High | Very high | Internet backbone, critical systems |
| 🌳 Tree | Hierarchy (bus + star) | Medium–High | Medium | Campuses, large companies |

---

# 🟧 PART 4 — Network Models

## 17. ❓ Why Do We Need Models?

You're watching a video on YouTube:

```text
📱 Request leaves your phone
    ↓
📶 Travels through Wi-Fi
    ↓
🌍 Crosses the Internet
    ↓
🏢 Reaches a server in a data center
    ↓
⚙️ Gets processed
    ↓
📺 Video data comes back — in a few seconds!
```

But:

| Device | Made by |
|---|---|
| 📱 Your phone | Apple |
| 🖥️ The server | Runs Linux |
| 🔀 The router | A completely different manufacturer |
| 📡 ISP equipment | Different again |

**How do they all understand each other?** 👉 **Network models.**

### ❌ The early days

Every company built its **own system** — own cables, own rules, own way of sending data — and **none of them could talk to each other**.

The industry needed a **common language** — not just for cables and signals, but for **every aspect** of how data moves from one place to another.

✅ That's why we have **layered models** — each layer has its own job and its own set of **protocols**.

---

## 18. 🧱 The Layered Models Side by Side

```text
   OSI Model           TCP/IP (original)      TCP/IP (updated)
┌──────────────┐
│ Application  │
├──────────────┤      ┌──────────────┐       ┌──────────────┐
│ Presentation │      │ Application  │       │ Application  │
├──────────────┤      │              │       │              │
│   Session    │      │              │       │              │
├──────────────┤      ├──────────────┤       ├──────────────┤
│  Transport   │      │  Transport   │       │  Transport   │
├──────────────┤      ├──────────────┤       ├──────────────┤
│   Network    │      │   Internet   │       │   Network    │
├──────────────┤      ├──────────────┤       ├──────────────┤
│  Data Link   │      │     Link     │       │  Data Link   │
├──────────────┤      │              │       ├──────────────┤
│   Physical   │      │              │       │   Physical   │
└──────────────┘      └──────────────┘       └──────────────┘
   7 layers              4 layers               5 layers
```

### 🏛️ Who defines the standards?

| Organization | Standardizes |
|---|---|
| **ISO** — International Organization for Standardization | The **OSI model** |
| **IETF** — Internet Engineering Task Force | Internet protocols: TCP, IP, HTTP, DNS (published as **RFCs**) |
| **IEEE** — Institute of Electrical and Electronics Engineers | Ethernet (802.3), Wi-Fi (802.11) |
| **W3C** — World Wide Web Consortium | Web standards: HTML, CSS |

---

## 19. 🚀 Why Layers? — Innovation & Flexibility

- ✅ Each layer can be **improved separately**
- ✅ Innovations in physical media (like **faster cables**) **don't affect** other layers — your browser doesn't care if you're on fiber or Wi-Fi
- ✅ Allows **easy upgrades** while keeping **compatibility**
- ✅ Makes **troubleshooting** easier — find which layer is broken

---

# 🟥 PART 5 — OSI Model (7 Layers), Encapsulation & PDU

## 20. 📖 What is the OSI Model?

**OSI = Open Systems Interconnection.**

It is a **conceptual framework** that helps **standardize and describe** how communication systems and networks work. It has **7 layers**, and each layer has its own specific tasks and responsibilities.

### 🧠 Memory trick

```text
Top → Bottom (7 → 1):  All People Seem To Need Data Processing
Bottom → Top (1 → 7):  Please Do Not Throw Sausage Pizza Away
```

---

## 21. 📊 OSI Layers Overview

| # | Layer | One-line job | Data unit | Examples / Devices |
|---|---|---|---|---|
| 7 | 🧑‍💻 **Application** | Human-computer interaction layer | Data | HTTP, HTTPS, FTP, SMTP, DNS, SSH |
| 6 | 🎨 **Presentation** | Makes sure data is in a usable format | Data | SSL/TLS, JPEG, ASCII |
| 5 | 🤝 **Session** | Creates & maintains sessions | Data | Login sessions, RPC |
| 4 | 🚚 **Transport** | Transmits data end-to-end using TCP/UDP | **Segment** | TCP, UDP, **ports** |
| 3 | 🗺️ **Network** | Decides which path the data will take | **Packet** | IP, ICMP, **Router** |
| 2 | 🔗 **Data Link** | Defines the format of data on the network | **Frame** | Ethernet, MAC, **Switch** |
| 1 | ⚡ **Physical** | Transmits raw bit stream over physical media | **Bits** | Cables, Wi-Fi signals, NIC |

---

## 22. 🧑‍💻 Layer 7 — Application Layer

**"Human-computer interaction layer"**

- The software that lets **humans interact** with the network works at this layer.
- **Example:** browsers (Chrome, Firefox) use application-layer protocols.
- ⚠️ Technically the **protocols** (HTTP, HTTPS) are the layer — the browser *uses* them.

| Protocol | Used for | Port |
|---|---|---|
| HTTP / HTTPS | Web pages | 80 / 443 |
| DNS | Domain name → IP address | 53 |
| SSH | Remote login to servers | 22 |
| FTP | File transfer | 21 |
| SMTP | Sending email | 25 |

---

## 23. 🎨 Layer 6 — Presentation Layer

**"Shows data in the correct format"**

```text
Translation ──▶ Encryption ──▶ Compression
```

| Job | What it does | Example |
|---|---|---|
| 🔤 **Translation** | Converts data into a machine-representable binary format (e.g. **ASCII → EBCDIC**) | Text → binary |
| 🔒 **Encryption / Decryption** | Secures data so nobody else can read it | SSL/TLS (the "S" in HTTPS) |
| 🗜️ **Compression / Decompression** | Reduces data size so it travels faster | JPEG, MP4, GZIP |

---

## 24. 🤝 Layer 5 — Session Layer

**"Session of communication"**

- ✅ **Creates, maintains and ends** sessions between two devices
- ✅ **Authentication & Authorization** are involved here (who are you? what are you allowed to do?)
- ✅ Uses **timeframes / checkpoints** — sessions expire after inactivity; a failed transfer can resume from the last checkpoint

**Example:** staying logged into a website until your session times out.

---

## 25. 🚚 Layer 4 — Transport Layer

**"Makes sure data is transferred effectively, end to end"**

- **Protocols:** **TCP** and **UDP**
- Uses **port numbers** to deliver data to the right application
- Data unit: **Segment**

Transport is done in **3 steps**:

```text
a. Segmentation  →  b. Flow Control  →  c. Error Control
```

### a. ✂️ Segmentation

Data from the session layer is divided into small pieces called **segments**. Each segment has:

- 📍 **Source & Destination Port Number** → which app sent it, which app should receive it
- 🔢 **Sequence Number** → helps **reassemble segments in the correct order**

### b. 🚦 Flow Control

Controls **the amount of data** being transferred, so a fast sender doesn't overwhelm a slow receiver.

### c. ✅ Error Control

Quality-of-data check — a **checksum** is added to every segment. Corrupted/lost data is re-sent (TCP).

### ⚔️ TCP vs UDP

| 📬 TCP | 📢 UDP |
|---|---|
| Transmission Control Protocol | User Datagram Protocol |
| **Connection-oriented** (3-way handshake: SYN → SYN-ACK → ACK) | **Connectionless** |
| **Reliable** — guaranteed delivery & order | **No guarantee** |
| Slower | Faster |
| Web, email, file download, SSH | Video streaming, gaming, voice calls, DNS |

> 💡 **TCP = registered post** (confirmed delivery). **UDP = shouting in a crowd** (fast, no guarantee).

---

## 26. 🗺️ Layer 3 — Network Layer

**"Decides which path the data will take"**

- 🏷️ **Logical addressing** — IP addressing done in the network layer is called **logical addressing** (e.g. `192.168.1.10`)
- 🛣️ **Routing** — moving a **packet** from source to destination
- ⚖️ **Load balancing / path selection** — traffic can be spread across multiple paths
- **Device:** 🔀 **Router**
- **Protocols:** IP (IPv4, IPv6), ICMP (`ping`)
- Data unit: **Packet**

---

## 27. 🔗 Layer 2 — Data Link Layer

**"Defines the format of data on the network"**

Primary functions:

- 📦 **Framing** — packets are wrapped into **frames**
- 🏷️ **Physical addressing** — the frame includes **source MAC** and **destination MAC** address
- ✅ **Error detection & correction**
- 🚦 **Flow control**

**MAC address** → a **48-bit** address written as **12 hexadecimal digits** (0–9, A–F), identifying your computer's **network interface (NIC)**.

```text
Example MAC: 00:1A:2B:3C:4D:5E
```

- **Device:** 🔀 **Switch**
- **Protocols:** Ethernet, Wi-Fi (802.11), ARP (finds MAC from IP)
- Data unit: **Frame**

### 🆚 IP Address vs MAC Address

| 🏷️ IP Address | 🔖 MAC Address |
|---|---|
| Logical address (Layer 3) | Physical address (Layer 2) |
| Can change (depends on network) | Fixed to the network card |
| `192.168.1.10` | `00:1A:2B:3C:4D:5E` |
| Like your **home address** 🏠 | Like your **Aadhaar number** 🪪 |

---

## 28. ⚡ Layer 1 — Physical Layer

**"Transmits the raw bit stream over the physical media"**

- Represents the **actual physical** medium — **Ethernet cables** or **wireless signals**
- The **NIC card** converts **frames into bits** (**encoding**)
- Transmits data as **bits** in the form of **signals**:
  - ⚡ electrical (copper cable)
  - 💡 light (fiber optic)
  - 📶 radio (Wi-Fi)
- **Devices:** cables, hubs, repeaters, NIC
- Data unit: **Bits**

---

## 29. 🔄 How Data Moves Through the OSI Model

The **client** goes **down** the layers, the **server** goes **up**.

```text
💻 CLIENT SIDE (sending)
RAW ──▶ ENCRYPTED ──▶ SEGMENT ──▶ PACKET ──▶ FRAME ──▶ BITS
 L7        L6           L4          L3         L2        L1

                         ⚡ travels over cable / Wi-Fi ⚡

🖥️ SERVER SIDE (receiving)
BITS ──▶ FRAME ──▶ PACKET ──▶ SEGMENT ──▶ DECRYPTED ──▶ RAW
 L1        L2        L3          L4           L6         L7
```

```text
SENDER                                           RECEIVER
 7 Application   ▼                             ▲  7 Application
 6 Presentation  ▼  encrypt / compress         ▲  6 Presentation
 5 Session       ▼                             ▲  5 Session
 4 Transport     ▼  + port numbers   (segment) ▲  4 Transport
 3 Network       ▼  + IP addresses   (packet)  ▲  3 Network
 2 Data Link     ▼  + MAC addresses  (frame)   ▲  2 Data Link
 1 Physical      ▼ ──── 010101010 (bits) ────▶ ▲  1 Physical
```

> 📦 Adding headers on the way down = **Encapsulation**. Removing them on the way up = **Decapsulation**.

---

## 30. 📦 Encapsulation & Decapsulation

**Encapsulation** = adding **headers** (and sometimes **trailers**) to data as it moves **down** the layers, before it is sent over the network.

Think of it like **packing a parcel** 📦 — the letter goes in an envelope, the envelope goes in a box, the box gets a shipping label.

```text
Application layer        Data
                           │  encapsulate ▼
Transport layer    (L4)  L4 Header | Data
                           │  encapsulate ▼
Network layer      (L3)  L3 Header | L4 Header | Data
                           │  encapsulate ▼
Data Link layer    (L2)  L2 Header | L3 Header | L4 Header | Data | L2 Trailer
                           │
Physical layer     (L1)  0111101011000100111110011110110110101010111...
```

| Layer | What it adds | Contains |
|---|---|---|
| L4 Transport | **L4 header** | Source & destination **port**, sequence number, checksum |
| L3 Network | **L3 header** | Source & destination **IP address** |
| L2 Data Link | **L2 header + trailer** | Source & destination **MAC address** (header), error check (trailer) |
| L1 Physical | nothing — converts to **bits** | Electrical / light / radio signals |

> ⚠️ Only the **Data Link layer adds a trailer** — the others add a header only.

### 📭 Decapsulation

**Decapsulation** is the **opposite** — the receiver goes **up** the layers and each layer **removes its own header** (unpacking the parcel).

```text
ENCAPSULATION (sender)     ▼  7 → 1   add headers
DECAPSULATION (receiver)   ▲  1 → 7   remove headers
```

---

## 31. 🏷️ Protocol Data Unit (PDU) & Payload

The message has a **different name at each layer**. These names are called **Protocol Data Units (PDUs)**.

| Layer | PDU name | Looks like |
|---|---|---|
| L4 Transport | **Segment** (TCP) / **Datagram** (UDP) | `[L4 Header][Data]` |
| L3 Network | **Packet** | `[L3 Header][L4 Header][Data]` |
| L2 Data Link | **Frame** | `[L2 Header][L3 Header][L4 Header][Data][L2 Trailer]` |
| L1 Physical | **Bits** | `0101101...` |

### 📦 Payload

The **contents** carried inside a PDU (everything except its own header/trailer) is called the **payload**.

```text
          L2 Header | L3 Header | L4 Header | Data | L2 Trailer
                    │                              │
                    └────────── Payload ───────────┘
                         (the payload of a frame)
```

| PDU | Its payload is... |
|---|---|
| Segment / Datagram | Application **data** |
| Packet | A **segment / datagram** |
| Frame | A **packet** |

> 🧠 Each layer's whole PDU becomes the **payload** of the layer below it — like a box inside a box inside a box.

---

# 🟪 PART 6 — TCP/IP Model

## 32. 📖 What is the TCP/IP Model?

**TCP/IP = Transmission Control Protocol / Internet Protocol**, developed by **ARPA** (US Department of Defense).

- ✅ It is the **set of communication protocols** used on the **Internet** and similar networks
- ✅ Provides **end-to-end data communication**
- ✅ The **OSI model is theoretical**; **TCP/IP is what the real Internet actually uses**
- Organized into **5 layers** (updated version): **Application, Transport, Network (Internet), Data Link, Physical**

---

## 33. 🧱 TCP/IP Layers

| Layer | Job | Uses |
|---|---|---|
| 🧑‍💻 **Application** | Protocols for communication between **application processes** | HTTP, HTTPS, DNS, SMTP, SSH |
| 🚚 **Transport** | End-to-end communication between **application processes** using **port numbers** | TCP, UDP |
| 🗺️ **Network** | End-to-end communication between **hosts across networks** using **IP addresses** | IP, ICMP, Routers |
| 🔗 **Data Link** | **Hop-to-hop** delivery within the local network using **MAC addresses** and **switches** | Ethernet, Wi-Fi |
| ⚡ **Physical** | Sends **bits** as electrical, optical or radio signals over the physical medium | Cables, fiber, radio |

### 🔁 OSI → TCP/IP mapping

```text
OSI 7 Application  ┐
OSI 6 Presentation ├──▶  Application
OSI 5 Session      ┘
OSI 4 Transport    ────▶  Transport
OSI 3 Network      ────▶  Network (Internet)
OSI 2 Data Link    ────▶  Data Link
OSI 1 Physical     ────▶  Physical
```

---

## 34. ⚙️ How TCP/IP Works — Real Example

You open **YouTube** and **Gmail** at the same time:

```text
                    ┌──────────── APPLICATION LAYER ────────────┐
👤 User (Browser)                                       🖥️ Google Server
   │                                                     ├─ YouTube → PORT 443 (HTTPS)
   │                ┌──────────── TRANSPORT LAYER ──────┐ └─ Mail    → PORT 25  (SMTP)
   │                   ports decide WHICH app gets the data
   │
   │                ┌──────────── NETWORK LAYER ────────┐
   │                   IP decides WHICH host: 192.0.0.1 → 142.250.0.0
   │
   │                ┌──────────── DATA LINK + PHYSICAL ─┐
   ▼
192.0.0.1 ── Switch 1 ── Router 1 ════ physical ════ Router 2 ── Switch 2 ── 142.250.0.0
 (you)       (MAC)       (IP)        (cables/fiber)    (IP)       (MAC)      (Google)
```

**Step by step:**

1. 🧑‍💻 **Application** — browser creates an HTTPS request for YouTube
2. 🚚 **Transport** — adds destination port **443** (HTTPS) plus a random **source port**, so replies reach the right browser tab. Sending mail server-to-server would use SMTP port **25** instead
3. 🗺️ **Network** — adds source IP `192.0.0.1` and destination IP `142.250.0.0`; **routers** pick the path
4. 🔗 **Data Link** — **switches** deliver hop-to-hop inside each local network using **MAC addresses**
5. ⚡ **Physical** — bits travel as signals over cables / fiber / Wi-Fi
6. 🖥️ Google's server unpacks it **bottom → top** and sends the response back the same way

---

## 35. 🆚 OSI vs TCP/IP

| 📘 OSI | 🌐 TCP/IP |
|---|---|
| 7 layers | 4 layers (original) / 5 layers (updated) |
| **Conceptual / reference** model | **Practical** — used on the real Internet |
| Developed by **ISO** | Developed by **ARPA** (US DoD) |
| Model first, protocols later | Protocols first, model described them |
| Used for learning & troubleshooting | Used for actual communication |

---

# 📨 PART 7 — Message Delivery

## 36. ❓ Who Are We Sending To?

We've covered how the OSI layers work, how TCP/IP maps to it, and how a packet travels end to end.

But one question is still open — **when a device sends data, who is it sending to?**

- 👤 **One** device?
- 👥 A **specific group**?
- 🌍 **Everyone**?
- 📍 The **nearest** one?

These are **not the same thing** — and the network handles each case differently. That's what **message delivery types** are about.

```text
1. Unicast    → one to one
2. Broadcast  → one to all
3. Multicast  → one to a group
4. Anycast    → one to the nearest
```

---

## 37. 👤 Unicast — One to One

One sender → **exactly one** receiver.

```text
  📱 ───────────▶ 🖥️
sender         receiver
```

- ✅ The **most common** type of traffic on the Internet
- **Examples:** your Netflix stream 🎬, your API call, your SSH session

---

## 38. 📢 Broadcast — One to All

One sender → **every device** on the local network.

```text
            ┌──▶ 💻
            ├──▶ 💻
  📱 ───────┼──▶ 💻
            ├──▶ 🖨️
            └──▶ 📺
```

- **Real-life analogy:** a message in a WhatsApp group — everyone in the group gets it
- **Network example:** ARP asking *"who has IP 192.168.1.5?"* — sent to everyone on the LAN
- ⚠️ Broadcasts stay **inside the local network** — routers do **not** forward them to the Internet

---

## 39. 👥 Multicast — One to a Group

One sender → **only the devices that joined (subscribed to) a group**.

```text
            ┌──▶ 💻 ✅ subscribed
  📱 ───────┼──▶ 💻 ✅ subscribed
            │    🖨️ ❌ not subscribed (gets nothing)
            └──▶ 📺 ✅ subscribed
```

- **Example:** a live video stream going only to **subscribed viewers**, IPTV
- ✅ More efficient than sending a separate unicast copy to each viewer

---

## 40. 📍 Anycast — One to the Nearest

The **most interesting** and the **least understood** one.

With anycast, **multiple servers around the world share the same IP address**. Your request goes to the **nearest** one.

```text
                    1.1.1.1  (same IP everywhere)
                  ╱             │              ╲
   🖥️ Mumbai server     🖥️ London server     🖥️ New York server
          ▲                     ▲                     ▲
   👤 user in Mumbai     👤 user in London     👤 user in New York
```

### 🌐 Example — DNS

- When you type a domain name, your device asks a **DNS resolver** — that query often goes to an **anycast** address.
- **Cloudflare's DNS resolver `1.1.1.1`** is hosted on **hundreds of servers** worldwide at the same time.
- Query from **Mumbai** → you hit a server in **Mumbai**. Query from **London** → you hit a server in **London**.

> 💡 **Same IP, different physical machines — the nearest one wins.** CDNs (Cloudflare, AWS CloudFront) use anycast to make websites fast everywhere.

---

## 41. 📊 Message Delivery Comparison

| Type | Sends to | Example |
|---|---|---|
| 👤 **Unicast** | One specific device | Netflix stream, API call, SSH session |
| 📢 **Broadcast** | All devices on the local network | WhatsApp-group style; ARP requests |
| 👥 **Multicast** | Only subscribed devices | Live video stream to subscribers |
| 📍 **Anycast** | The nearest of many servers (same IP) | DNS queries to `1.1.1.1` |

---

# 🔌 PART 8 — Network Devices, ISPs, Firewall & Host-to-Host

## 42. 🖧 NIC — Network Interface Card

Every device that talks over a network — **laptop, phone, server, smart TV, printer** — has a **NIC** inside it.

- 🕰️ On **older desktops**, NICs were **separate expansion cards** plugged into the motherboard
- 💻 **Today**, NICs are almost always **built into the motherboard** — you don't see them because they're soldered in

### 🖼️ Where the NIC sits

```text
┌──────────── 💻 Your Laptop ─────────────┐
│                                         │
│   Apps (Chrome, Zoom...)                │
│        │                                │
│   Operating System (TCP/IP stack)       │
│        │                                │
│   ┌────┴─────────────────────────────┐  │
│   │  🖧 NIC   MAC: 3C:22:FB:9A:10:7E │  │
│   │  ├─ 🔌 Wired  (Ethernet port)  ──┼──┼──── LAN cable ────▶ Switch / Router
│   │  └─ 📶 Wireless (Wi-Fi adapter) ─┼──┼──── radio waves ~~▶ Wi-Fi Router
│   └──────────────────────────────────┘  │
└─────────────────────────────────────────┘

Frames from the OS  ──▶  NIC  ──▶  bits as signals on the cable / air
```

### Two types of NIC

| 🔌 Wired NIC | 📶 Wireless NIC |
|---|---|
| Has an **Ethernet port** — the rectangular port where you plug in a LAN cable | Also called a **Wi-Fi adapter** |
| Communicates through **physical cables** | Communicates through **radio waves** — no cable needed |

> Most modern devices have **both**.

### 🔖 MAC address

Every NIC in the world has a **unique identifier burned into it at the factory** → the **MAC address** (**M**edia **A**ccess **C**ontrol address).

### Which layer?

A NIC works at **two layers**:

```text
Layer 1 (Physical)  → physically sends & receives signals (bits)
Layer 2 (Data Link) → uses the MAC address for local identification
```

### 🔍 See your MAC address

```bash
# macOS (Terminal)
ifconfig en0 | grep ether

# Linux
ip link

# Windows (PowerShell)
getmac
```

---

## 43. 🔌 Hub

Every device has a NIC, and every NIC has a MAC address. When **multiple devices** want to talk to each other, something must **connect them together** → the simplest device for this is a **hub**.

```text
           💻 PC1  (sender)
             │
   💻 PC4 ── HUB ── 💻 PC2
             │
           💻 PC3

PC1 sends to PC3 → HUB copies it to PC2, PC3 AND PC4 ❌
```

- ⚡ Works at **Layer 1 (Physical)** — it does **not understand MAC addresses**
- 📢 **Broadcasts** — whatever comes in on one port is sent **out of every other port**
- 🔢 Has a **small number of ports** (usually 4–12)
- ❌ Wastes bandwidth, causes **collisions**, and is insecure (every device sees all traffic)
- 🗑️ Mostly **replaced by switches** today

---

## 44. 🌉 Bridge

A **bridge** connects **two network segments** (e.g. two hubs / two small LANs) and **filters traffic** between them.

```text
  [ PC1  PC2 ]──HUB A ──── BRIDGE ──── HUB B──[ PC3  PC4 ]
     Segment A                             Segment B

PC1 → PC2 : bridge sees both are on Segment A → does NOT forward ✅
PC1 → PC3 : bridge sees PC3 is on Segment B   → forwards it ✅
```

- 🔗 Works at **Layer 2 (Data Link)** — it **understands MAC addresses**
- 📒 Learns which MAC address is on which side and keeps a **MAC address table**
- ✅ Forwards a frame **only if** the destination is on the other side → less unnecessary traffic than a hub
- 🔢 Usually has only **2 ports**
- 💡 A **switch** is basically a **multi-port bridge** — the next step up

### 🆚 Hub vs Bridge

| 🔌 Hub | 🌉 Bridge |
|---|---|
| Layer 1 (Physical) | Layer 2 (Data Link) |
| Doesn't understand MAC addresses | Uses MAC addresses (MAC table) |
| Sends data to **all** ports | Forwards **only** when needed |
| Many ports (4–12) | Usually 2 ports |
| Dumb device ❌ | Smart filtering ✅ |

---

## 45. 🔀 Switch

A **switch** connects many devices **inside the same LAN** — and sends data **only to the device it's meant for**.

> 💡 A switch = a **smart hub** = a **multi-port bridge**.

```text
           💻 PC1  (sender)
             │
   💻 PC4 ── SWITCH ── 💻 PC2
             │
           💻 PC3

PC1 sends to PC3 → SWITCH checks MAC table → sends ONLY to PC3 ✅
```

### How a switch works

1. 📥 A frame arrives on a port
2. 📒 The switch **learns** the sender's MAC address → saves `MAC → port` in its **MAC address table**
3. 🔍 It looks up the **destination MAC** in the table
4. 📤 Found → sends **only to that port**. Not found yet → sends to all ports **once** (flooding), then learns

```text
MAC Address Table
┌───────────────────┬──────┐
│ MAC address       │ Port │
├───────────────────┼──────┤
│ AA:AA:AA:AA:AA:01 │  1   │  ← PC1
│ AA:AA:AA:AA:AA:02 │  2   │  ← PC2
│ AA:AA:AA:AA:AA:03 │  3   │  ← PC3
└───────────────────┴──────┘
```

- 🔗 Works at **Layer 2 (Data Link)** — uses **MAC addresses**
- 🔢 Many ports (8, 16, 24, 48...)
- ✅ Fast, secure (others don't see your traffic), no wasted bandwidth
- ⚠️ Connects devices **within one network** — it **cannot** connect you to the Internet by itself (that's the router's job)

---

## 46. 🗺️ Router

A **router** connects **different networks** together and picks the **best path** for each packet.

> Switch = connects devices **inside** a network 🏠
> Router = connects **networks to each other** 🌍

```text
   🏠 Home LAN                                   🌍 Internet
 192.168.1.0/24
 💻 ──┐
 📱 ──┼── SWITCH ── ROUTER ═══════ ISP ═══════ other routers ── 🖥️ Google
 🖨️ ──┘            (192.168.1.1)
```

- 🗺️ Works at **Layer 3 (Network)** — uses **IP addresses**
- 📒 Keeps a **routing table** — "to reach network X, send the packet out of this interface / to this next router"
- 🛣️ Every hop across the Internet is a router forwarding your packet closer to the destination
- 🏠 Your home router also does **NAT** — many devices share **one public IP** from your ISP

```bash
# See the routers (hops) between you and Google
traceroute google.com      # macOS / Linux
tracert google.com         # Windows
```

> 💡 **Cloud link:** in AWS, every **VPC has a route table** and an **Internet Gateway** — that's the router's job done in software.

---

## 47. 📡 Modem

**Modem = MOdulator + DEModulator.**

Your computer speaks **digital** (0s and 1s). The ISP's line (telephone line, cable, fiber) carries signals in a **different form**. The modem **converts** between the two.

```text
💻 Digital data ──▶ MODEM ──▶ signal on ISP line ──▶ ISP
    (0101...)     modulate     (analog / light)

💻 Digital data ◀── MODEM ◀── signal on ISP line ◀── ISP
                 demodulate
```

- ⚡ Works at **Layer 1 (Physical)** — just converts signals
- 🔌 It is the device that connects your home to the **ISP**
- Types: **DSL** (telephone line), **Cable** modem, **ONT** for fiber (Jio Fiber, Airtel Xstream)

### 🏠 Modem vs Router

| 📡 Modem | 🗺️ Router |
|---|---|
| Connects your home **to the ISP** | Connects **your devices** to each other and to the modem |
| Converts signals (digital ↔ line signal) | Forwards packets using IP addresses |
| Layer 1 | Layer 3 |
| Gives you **one** Internet connection | Shares it with **many** devices (Wi-Fi + NAT) |

> 💡 The box your ISP gives you is usually **modem + router + switch + Wi-Fi access point all in one**.

---

## 48. 🚪 Gateway

A **gateway** is the **"door" from your network to another network** — usually your router's IP address.

> 🚪 If a device wants to talk to something **outside** its own network, it sends the packet to the **default gateway**.

```text
💻 192.168.1.10 wants google.com (142.250.0.0)
      │
      │  "Is 142.250.0.0 in my network 192.168.1.x?"  → NO
      ▼
🚪 Default gateway 192.168.1.1 (your router) ──▶ 🌍 Internet ──▶ 🖥️ Google
```

- 🏠 At home, the **default gateway = your router's IP** (usually `192.168.1.1` or `192.168.0.1`)
- 🔄 A gateway can also **translate between different protocols / network types** — so "gateway" is a **role**, not always a separate box
- Every device on a network is configured with **IP address + subnet mask + default gateway**

```bash
# See your default gateway
route -n get default | grep gateway   # macOS
ip route | grep default               # Linux
ipconfig                              # Windows → "Default Gateway"
```

> 💡 **Cloud link:** AWS **Internet Gateway (IGW)** = the door from your VPC to the Internet. **NAT Gateway** = lets private servers reach the Internet without being reachable from it.

---

## 49. 🏢 ISP — Internet Service Provider

An **ISP** is the company that **connects you to the Internet** — and connects to **other ISPs** so you can reach the whole world.

**Examples in India:** Jio, Airtel, BSNL, ACT, Vodafone Idea.

### 🪜 ISPs work in tiers

```text
                  🌍 TIER 1 — Global backbone
         (Tata Communications, AT&T, NTT, Lumen...)
       own undersea cables + connect continents
       ════════════════════╦═══════════════════════
                           ║  (peering — exchange traffic for free)
         ┌─────────────────╨──────────────────┐
         ▼                                    ▼
   🇮🇳 TIER 2 — National / regional       🇺🇸 TIER 2
   (Airtel, Jio backbone)               (Comcast, Verizon)
         │                                    │
         ▼                                    ▼
   🏙️ TIER 3 — Local / last mile         🏙️ TIER 3
   (local cable / fiber provider)       (local provider)
         │                                    │
         ▼                                    ▼
      🏠 YOU                              🖥️ Server in USA
```

| Tier | Who | Job |
|---|---|---|
| **Tier 1** | Global backbone carriers | Own huge networks + undersea cables, connect countries/continents |
| **Tier 2** | National / regional ISPs | Connect cities/regions, buy access from Tier 1 |
| **Tier 3** | Local ISPs | The "last mile" — the cable/fiber to your home |

### 🔁 IXP — Internet Exchange Point

An **IXP** is a building where many ISPs plug into each other to **exchange traffic directly** (faster + cheaper than going through a third network). Example: **NIXI** in Mumbai, Delhi, Chennai.

```text
   Jio ──┐
 Airtel ─┼──▶ 🏢 IXP (Mumbai) ◀──┬── Google
  ACT ───┘                       └── Cloudflare
```

### What your ISP gives you

- 🌐 A **public IP address** for your home (shared by all your devices via NAT)
- 📡 The **modem / ONT** + often a router
- 🔍 **DNS servers** (unless you use `1.1.1.1` or `8.8.8.8`)

> 💡 This answers the big question from §2 — **India → USA**:
> `You → Tier 3 → Tier 2 (Jio) → IXP / Tier 1 → undersea cable → US Tier 2 → data center → server`

---

## 50. 🧱 Firewall

A **firewall** is a **security guard** 💂 that sits between networks and **checks every packet** against **rules** — allowed ✅ packets pass, everything else ❌ is blocked.

```text
                       🧱 FIREWALL
  🌍 Internet          ┌──────────┐            🏠 Your network
                       │  RULES   │
  ✅ HTTPS :443 ──────▶│  allow   │──────────▶ 🖥️ Web server
  ✅ SSH :22 (my IP) ─▶│  allow   │──────────▶ 🖥️ Web server
  ❌ Telnet :23 ──────▶│  DENY ✋ │
  ❌ Unknown IP :3306 ▶│  DENY ✋ │      (database never exposed)
                       └──────────┘
```

### 📋 Firewall rules look like this

| # | Action | Protocol | Port | Source | Meaning |
|---|---|---|---|---|---|
| 1 | ✅ Allow | TCP | 443 | Anywhere | Everyone can open the website (HTTPS) |
| 2 | ✅ Allow | TCP | 80 | Anywhere | Plain HTTP (usually redirects to HTTPS) |
| 3 | ✅ Allow | TCP | 22 | **My IP only** | Only I can SSH into the server |
| 4 | ❌ Deny | Any | Any | Anywhere | **Block everything else** (default deny) |

> 🧠 Rules are checked **top to bottom** — the **first match wins**. Last rule = **deny all**.

### What a firewall checks

```text
Source IP?  →  Destination IP?  →  Port?  →  Protocol (TCP/UDP)?  →  ALLOW or DENY
   (L3)            (L3)            (L4)          (L4)
```

### Types of firewall

| Type | Where | Example |
|---|---|---|
| 💻 **Host-based** (software) | On one machine | `ufw` / `iptables` (Linux), Windows Defender Firewall, macOS firewall |
| 🏢 **Network-based** (hardware) | Between networks | Fortinet, Palo Alto, Cisco ASA, your home router's firewall |
| ☁️ **Cloud firewall** | Around cloud resources | AWS **Security Groups**, **NACLs**, Azure NSG |

### Stateful vs Stateless

| 🧠 Stateful | 📋 Stateless |
|---|---|
| **Remembers** connections — if you sent a request out, the reply is allowed back in automatically | Checks **every packet alone**, no memory — you must allow both directions |
| AWS **Security Group** | AWS **NACL** |

```bash
# Linux (Ubuntu) host firewall with ufw
sudo ufw allow 22/tcp     # allow SSH
sudo ufw allow 443/tcp    # allow HTTPS
sudo ufw enable           # turn on (default: deny incoming)
sudo ufw status           # see rules
```

> ⚠️ Always **allow SSH (22) before** running `ufw enable` on a remote server — or you'll lock yourself out!

---

## 51. 🔄 Host-to-Host Communication

How does one host actually reach another? There are **two cases**:

1. 🏠 Both hosts are in the **same network** → talk directly through the **switch**
2. 🌍 Hosts are in **different networks** → go through the **router (gateway)**

### Case 1 — Same network (PC-A → PC-B)

```text
   PC-A                    SWITCH                    PC-B
 192.168.1.10                                     192.168.1.20
 MAC: AA-AA                                       MAC: BB-BB

 ① "Is 192.168.1.20 in my network?" → YES (same 192.168.1.x)

 ② ARP broadcast 📢  "Who has 192.168.1.20? Tell AA-AA"
    PC-A ─────────────▶ SWITCH ─────────▶ every device

 ③ ARP reply (unicast) "192.168.1.20 is at BB-BB"
    PC-A ◀───────────── SWITCH ◀───────── PC-B

 ④ PC-A sends the frame
    ┌─────────────────────────────────────────────────┐
    │ dst MAC BB-BB │ src MAC AA-AA │ dst IP .20 │ data│
    └─────────────────────────────────────────────────┘
    PC-A ─────────────▶ SWITCH ─────(port of BB-BB only)───▶ PC-B ✅
```

> 🧠 **ARP** (Address Resolution Protocol) = finds the **MAC address** for a known **IP address**. Results are cached — see with `arp -a`.

### Case 2 — Different networks (PC-A → Server on the Internet)

```text
 PC-A               ROUTER (gateway)                 Server
 192.168.1.10       192.168.1.1 | 49.36.x.x (public)  142.250.0.10
 MAC: AA-AA         MAC: RR-RR

 ① "Is 142.250.0.10 in my network?" → NO → send to DEFAULT GATEWAY
 ② ARP: "Who has 192.168.1.1?" → "RR-RR" (the router)
 ③ Frame to the router:
    dst MAC = RR-RR (router)  │  dst IP = 142.250.0.10 (server)
 ④ Router checks its routing table → forwards to ISP → hop by hop → Server ✅
```

### 🔑 The golden rule

```text
            HOP 1               HOP 2             HOP 3
 PC-A ───────────▶ Router1 ───────────▶ Router2 ───────────▶ Server
 MAC: A → R1          MAC: R1 → R2         MAC: R2 → S        ← CHANGES every hop
 IP : PC-A → Server   IP : PC-A → Server   IP : PC-A → Server ← SAME end to end*
```

> 🧠 **MAC address = next hop** (changes at every router).
> **IP address = final destination** (stays the same end to end).
> \*Except when NAT at your home router swaps your private IP for the public one.

### 📊 Step summary

| Step | Same network | Different network |
|---|---|---|
| 1. Check destination IP | In my network ✅ | Not in my network ❌ |
| 2. ARP for... | the **destination's** MAC | the **gateway's (router's)** MAC |
| 3. Frame goes to | destination via **switch** | **router** |
| 4. Who delivers | Switch (L2, MAC) | Routers hop by hop (L3, IP) |

---

## 52. 🏠 Putting It All Together — Your Home Network

```text
 📱 💻 📺 🖨️                     YOUR HOME (LAN 192.168.1.x)
 NIC + MAC
    │  Wi-Fi / LAN cable
    ▼
 🔀 SWITCH ─────────▶ 🗺️ ROUTER + 🧱 FIREWALL ─────────▶ 📡 MODEM / ONT
 (L2, MAC table)       (L3, IP, NAT)                       (L1, signals)
                       = 🚪 DEFAULT GATEWAY 192.168.1.1          │
                                                                 ▼
                                                    🏢 ISP (Tier 3 → Tier 2)
                                                                 │
                                                    🏢 IXP / Tier 1 backbone
                                                                 │
                                                    🌊 undersea cable
                                                                 │
                                                    🧱 Firewall ─▶ 🖥️ Server (USA)
```

> 🏠 At home, **switch + router + firewall + Wi-Fi + modem** are usually **one box** from your ISP.

### 📊 Network Devices Comparison

| Device | OSI Layer | Uses | Job | Sends data to |
|---|---|---|---|---|
| 🖧 **NIC** | L1 + L2 | MAC | Connects one device to the network | — |
| 🔌 **Hub** | L1 | — | Connects devices (dumb) | **All** ports |
| 🌉 **Bridge** | L2 | MAC | Connects 2 segments, filters | Other side only if needed |
| 🔀 **Switch** | L2 | MAC | Connects devices in a LAN (smart) | **Only** the right port |
| 🗺️ **Router** | L3 | IP | Connects different networks, best path | Next network / hop |
| 📡 **Modem** | L1 | — | Converts digital ↔ ISP line signal | ISP |
| 🚪 **Gateway** | L3+ (role) | IP | Door to another network | Outside networks |
| 🧱 **Firewall** | L3 + L4 (and up) | IP, ports | Allows / blocks traffic by rules | Only allowed traffic |

---

# 🟫 PART 9 — Network Layer & IP Addressing

## 53. ❓ Why Do We Need IP Addresses?

In the previous parts we covered the **Physical** and **Data Link** layers. You now know that a **MAC address** identifies a device on a **local network**.

But here is the problem:

- ❌ MAC addresses only work **locally, inside one LAN**
- ❌ The moment your data has to **leave** your network and cross the Internet to a server in another country, MAC addresses are **useless**. They were never designed for that (remember: the MAC changes at every hop, see §51)

We need a **different addressing system**, one that:

- ✅ works at a **global scale**
- ✅ **every device** on the Internet understands
- ✅ **routers** can use to decide **where to send your data**

👉 That system is **IP addressing**, and it lives at **Layer 3 (Network)**.

---

## 54. 🏷️ What is an IP Address?

An **IP address** (**Internet Protocol address**) is a **unique numerical label** assigned to every device on a network.

An IP address has **two parts**:

| Part | Identifies | Analogy |
|---|---|---|
| 🏘️ **Network portion (Network ID)** | **Which network** the device is on | Street name |
| 🏠 **Host portion (Host ID)** | **Which device** inside that network | House number |

```text
        172.217.14.206
        └──┬──┘ └──┬─┘
       Network    Host
         ID        ID
```

> ⚠️ Where the network part ends and the host part begins is **not fixed**. It is decided by the **subnet mask** (e.g. `255.255.0.0` or `/16` → first 2 octets = network). The split above assumes `/16`.

There are **two versions** of IP in use today: **IPv4** and **IPv6**.

---

## 55. 🔢 IPv4 vs IPv6

### IPv4

```text
192.168.1.1
 │   │  │ │
 └───┴──┴─┴── 4 numbers (octets) separated by dots
```

- Each number is called an **octet** (8 bits) and ranges from **0 to 255**
- 4 octets × 8 bits = **32 bits**
- 2³² ≈ **4.3 billion** addresses
- Defined in **1981** (RFC 791) and switched on across ARPANET in **1983**. Back then 4.3 billion seemed like more than enough. Nobody imagined billions of **smartphones, IoT devices, laptops and servers** all needing addresses.
- ❌ Result: **IPv4 address exhaustion**. We've run out of fresh IPv4 addresses (NAT and private IPs are what keep IPv4 alive)

### IPv6

The **long-term solution** to address exhaustion, standardized in **1998** and slowly becoming the standard.

```text
2001:0db8:85a3:0000:0000:8a2e:0370:7334
└─┬─┘
  8 groups of 4 hexadecimal characters, separated by colons
```

- 8 groups × 16 bits = **128 bits**
- 2¹²⁸ ≈ **3.4 × 10³⁸** (340 undecillion) addresses, effectively unlimited
- Can be **shortened**: leading zeros dropped, one run of all-zero groups replaced by `::`
  → `2001:db8:85a3::8a2e:370:7334`
- ✅ Other improvements: **no need for NAT** (every device can have a public address), simpler headers → **more efficient routing**, **IPsec** support designed in
- ⏳ Adoption has been **slow**, because changing Internet infrastructure is genuinely hard. Today the Internet runs on a **mix of IPv4 and IPv6** (dual-stack)

### 🆚 Comparison

| | IPv4 | IPv6 |
|---|---|---|
| Size | **32 bits** | **128 bits** |
| Format | 4 decimal octets, dots | 8 hex groups, colons |
| Example | `192.168.1.1` | `2001:db8::1` |
| Total addresses | ~4.3 billion | ~3.4 × 10³⁸ |
| NAT needed? | Yes (address shortage) | No |
| Loopback | `127.0.0.1` | `::1` |

> 💡 **Cloud link:** AWS VPCs are IPv4 by default; you can add an IPv6 CIDR block to make them **dual-stack**.

---

## 56. 🔐 Private vs Public IP

### 🤔 Two different IPs on the same device?

Run this in your terminal and look at the `inet` field of your active interface:

```bash
ifconfig en0 | grep "inet "   # macOS
ip addr                       # Linux
ipconfig                      # Windows → "IPv4 Address"
```

You'll see something starting with **`192.168.`**, **`10.`** or **`172.16–31.`**

Now search Google for **"what is my IP"**. You get a **completely different** address. Same device, two IP addresses. Why?

👉 Because there are **two kinds of IP addresses**: **private** and **public**.

```text
   🏠 YOUR HOME (private)                          🌍 INTERNET (public)

 💻 192.168.1.10 ──┐
 📱 192.168.1.11 ──┼── 🗺️ ROUTER (NAT) ── 49.36.x.x ──▶ 🖥️ Google sees 49.36.x.x
 📺 192.168.1.12 ──┘    private ↔ public
```

### 🏠 Private IP

- Works **only inside a local network**. It is **not visible** to the Internet
- **Cannot be reached directly** from outside your home/office network
- When your router gives an IP to your laptop, phone or smart TV, that's a **private IP**. It exists only inside your **LAN**
- ✅ Your neighbour's network can use the **exact same private range** as yours, and that's completely fine, because private IPs **never leave the local network**

There are **three reserved private ranges**, defined by the standard **RFC 1918**:

| Range | CIDR | Addresses available | Common use |
|---|---|---|---|
| `10.0.0.0` – `10.255.255.255` | `10.0.0.0/8` | ~16.7 million | Large enterprises, **cloud VPCs** |
| `172.16.0.0` – `172.31.255.255` | `172.16.0.0/12` | ~1 million | Mid-size networks, **Docker** (`172.17.0.0/16`) |
| `192.168.0.0` – `192.168.255.255` | `192.168.0.0/16` | ~65,000 | **Home & small office** networks |

### 🌍 Public IP

- The address that is **visible to the rest of the Internet**
- **Globally unique**: no two devices on the Internet can have the same public IP at the same time
- Your home has **one public IP**, assigned to your **router** by your **ISP**. Every device in your house shares it when talking to the Internet (thanks to **NAT**)
- It's the address **Google sees** when you search, and the address **Netflix sees** when you stream

### 🏛️ Who hands out public IPs?

Public IPs are managed by **IANA**, which gives blocks to 5 **Regional Internet Registries (RIRs)**. They make sure **no two organizations get the same public IP**.

| RIR | Full form | Region |
|---|---|---|
| **ARIN** | American Registry for Internet Numbers | USA, Canada, parts of the Caribbean |
| **APNIC** | Asia Pacific Network Information Centre | Asia-Pacific (🇮🇳 India) |
| **LACNIC** | Latin America and Caribbean Network Information Centre | Latin America & Caribbean |
| **RIPE NCC** | Réseaux IP Européens Network Coordination Centre | Europe, Middle East, Central Asia |
| **AFRINIC** | African Network Information Centre | Africa |

```text
IANA ──▶ RIR (e.g. APNIC) ──▶ ISP (Jio, Airtel) ──▶ 🏠 your router's public IP
```

### 🔁 Special address: Loopback (localhost)

- **`127.0.0.1`** = the **loopback** address, a.k.a. **`localhost`** (IPv6: `::1`)
- It **always refers to the device itself**. The whole `127.0.0.0/8` range is reserved for this
- When you run a dev server and open `localhost:3000`, that traffic **never leaves your machine**. It loops back to itself

### 📊 Private vs Public summary

| 🏠 Private IP | 🌍 Public IP |
|---|---|
| Works only inside the LAN | Visible on the Internet |
| Assigned by your **router** (DHCP) | Assigned by your **ISP** (from an RIR) |
| Can repeat across different networks | **Globally unique** |
| Free | Costs money (limited supply) |
| `192.168.1.10`, `10.0.0.5` | `49.36.12.34`, `142.250.0.10` |

> 💡 **Cloud link:** an AWS EC2 instance gets a **private IP** from your VPC subnet (e.g. `10.0.1.25`) and optionally a **public IP / Elastic IP** to be reachable from the Internet.

---

## 57. 🔄 Dynamic vs Static IP

### 🔄 Dynamic IP

A **dynamic IP** is **assigned automatically** and **can change over time**.

- This is what happens on **most home and office networks**
- When your laptop joins Wi-Fi, the router hands it an available IP from its **pool**. Next time you connect, you might get a **different one**
- The protocol that does this is **DHCP** (Dynamic Host Configuration Protocol)
- The address is **leased** for a period of time. When the lease expires, it can be **renewed** or **reassigned** to another device
- ✅ Dynamic IPs are the **default almost everywhere** because they are **efficient**: addresses are reused, and nobody has to configure devices by hand

```text
💻 Laptop: "I need an IP!"          (DHCP Discover, broadcast)
🗺️ Router: "Take 192.168.1.10"      (DHCP Offer)
💻 Laptop: "I'll take it"           (DHCP Request)
🗺️ Router: "Yours for 24 hours"     (DHCP Acknowledge)
```

> 🧠 Remember it as **DORA**: **D**iscover → **O**ffer → **R**equest → **A**cknowledge.

### 📌 Static IP

A **static IP** is **manually configured** (or permanently reserved) and **never changes**, unless you deliberately change it.

- If your **DNS record** says *"my server is at `203.0.113.10`"*, that address had better not change. A static IP guarantees it won't
- Used for things others must **always find at the same address**: **servers, routers, databases, printers, DNS servers**

> 💡 **Cloud link:** in the cloud you **explicitly allocate** a static public IP and **attach** it to your instance. Even if the instance stops and starts, the IP stays the same.
> AWS → **Elastic IP** · GCP → **Static external IP** · Azure → **Static public IP**.
> (A normal EC2 public IP is **dynamic**: it changes on stop/start.)

### 🆚 Dynamic vs Static

| 🔄 Dynamic IP | 📌 Static IP |
|---|---|
| Assigned **automatically** by **DHCP** | **Manually** set / permanently reserved |
| Can change on reconnect (lease expires) | **Never** changes |
| Default for home networks: laptops, phones | Used for **servers, routers, databases** |
| ❌ Not suitable for hosting servers | ✅ Essential for **DNS & public services** |
| Cheap, zero setup | Costs more (public static IPs), needs management |

> 🧠 **If something needs to find you → you need a static IP.** If you're just browsing, streaming video or connecting to cloud services → dynamic is perfectly fine.

---

# 🧮 PART 10 — Subnetting & CIDR

## 58. 🏢 Designing a Network — Why Subnets?

Imagine you work at a company with **500 people**: engineers, HR, finance, sales. Everyone sits in the **same office building**, all connected to the **same flat network**.

```text
                  ONE FLAT NETWORK (500 devices)
 ┌───────────────────────────────────────────────────────────┐
 │ 💰 Finance   👩‍💻 Engineers   🧑‍💼 HR   📞 Sales   🖨️ Printers │
 │        everyone can see everyone's traffic 👀              │
 └───────────────────────────────────────────────────────────┘
```

Here's the scary part:

- 🔓 **Security problem:** every time finance processes payroll or approves a bank transaction, that data travels across the **same network** every engineer and salesperson is on. Anyone with the right tools can see it
- 🐢 **Performance problem:** every device generates constant network noise, and **every broadcast packet** from any one device reaches **all 500 others**

✅ The fix: **split the network into smaller, isolated pieces** → **subnets**.

```text
 ┌──── Finance subnet ────┐   ┌──── Engineering subnet ──┐   ┌──── HR subnet ────┐
 │ 10.0.1.0/24  💰💰💰     │   │ 10.0.2.0/24  👩‍💻👩‍💻👩‍💻      │   │ 10.0.3.0/24 🧑‍💼🧑‍💼 │
 └───────────┬────────────┘   └────────────┬─────────────┘   └─────────┬─────────┘
             └────────────────────── 🗺️ ROUTER / 🧱 FIREWALL ──────────┘
                     traffic between subnets is controlled by rules
```

> 💡 **Cloud link:** this is exactly how an AWS **VPC** works. You split it into **public** and **private subnets** (web servers in public, databases in private).

---

## 59. ✂️ Subnet & Subnet Mask

A **subnet** (short for **subnetwork**) is a **logical division** of a larger IP network into **smaller, isolated segments**.

Every subnet is defined by **two things**:

| Part | Job | Example |
|---|---|---|
| 🏷️ **Network address** | Identifies the subnet itself | `192.168.1.0` |
| 🎭 **Subnet mask** | Decides whether an IP address **belongs** to this subnet | `255.255.255.0` |

The subnet mask **draws a line**: everything to the **left** is the **network**, everything to the **right** is the **host**.

```text
IP address   192.168.1.10   = 11000000.10101000.00000001.00001010
Subnet mask  255.255.255.0  = 11111111.11111111.11111111.00000000
                              └──────── network (1s) ───────┘└host┘
                                                              (0s)
→ Network: 192.168.1.0     Host: .10
```

> 🧠 **1s in the mask = network bits. 0s = host bits.** If two IPs have the same network part, they're in the **same subnet** and talk directly (via switch). Otherwise they need a **router** (see §51).

There are **two ways** of defining subnet masks: **classful** (old) and **classless / CIDR** (modern).

---

## 60. 🏛️ Classful Addressing (the old way)

The idea was simple: IP addresses were divided into **classes**, and each class had a **default subnet mask** automatically assigned to it. No manual work needed.

| Class | First octet | Default mask | Format | Usable hosts per network |
|---|---|---|---|---|
| **A** | 1 – 126 | `255.0.0.0` (/8) | `N.H.H.H` | 2²⁴ − 2 = **16,777,214** |
| **B** | 128 – 191 | `255.255.0.0` (/16) | `N.N.H.H` | 2¹⁶ − 2 = **65,534** |
| **C** | 192 – 223 | `255.255.255.0` (/24) | `N.N.N.H` | 2⁸ − 2 = **254** |
| **D** | 224 – 239 | — | — | Reserved for **multicast** |
| **E** | 240 – 255 | — | — | Reserved for **research / experimental** use |

> ⚠️ `127.x.x.x` is missing from Class A on purpose. It's reserved for **loopback** (`127.0.0.1`, see §56).
> **Why −2?** In every network, the **first** address is the **network address** and the **last** is the **broadcast address**, so neither can be given to a host.

### ❌ The massive flaw

What if your company has **500 devices**?

```text
Class C → 254 hosts      ❌ not enough
Class B → 65,534 hosts   ✅ fits... but wastes 65,034 addresses 🗑️
```

There is **nothing in between**. That's incredibly **inefficient**, and one of the reasons IPv4 ran out of addresses so fast.

---

## 61. 🎯 CIDR — Classless Inter-Domain Routing

**CIDR** throws out the rigid class system and says: **assign only as many addresses as you actually need.**

Instead of a mask locked to a class, you define **exactly where the network ends and the host begins**.

### 📝 CIDR notation

An IP address + a **slash** + a number called the **prefix length**:

```text
192.168.1.0/24
            └─ prefix length = first 24 bits are the NETWORK

32 total bits − 24 network bits = 8 host bits
2⁸ = 256 addresses − 2 (network + broadcast) = 254 usable hosts
```

> 🧮 **Formula:** usable hosts = **2^(32 − prefix) − 2**

### 📊 Common prefixes

| CIDR | Subnet mask | Total addresses | Usable hosts | Typical use |
|---|---|---|---|---|
| /8 | `255.0.0.0` | 16,777,216 | 16,777,214 | Huge networks |
| /16 | `255.255.0.0` | 65,536 | 65,534 | AWS **VPC** (e.g. `10.0.0.0/16`) |
| /24 | `255.255.255.0` | 256 | 254 | A typical **subnet** / home LAN |
| /25 | `255.255.255.128` | 128 | **126** | |
| /26 | `255.255.255.192` | 64 | **62** | |
| /27 | `255.255.255.224` | 32 | 30 | Small subnet |
| /28 | `255.255.255.240` | 16 | 14 | Smallest AWS subnet |
| /32 | `255.255.255.255` | 1 | 1 (single host) | One IP in a firewall rule (`my-ip/32`) |

✅ You're no longer stuck with 254 or 65,534. Say **/25** and get **126** hosts, **/26** gives **62**. Take **exactly what you need**.

For the 500-device company: **/23** → 2⁹ − 2 = **510** hosts. ✅ Almost no waste.

> 💡 **Cloud link:** AWS reserves **5** IPs in every subnet (not 2), so a `/24` subnet gives **251** usable IPs.

---

## 62. ⚡ Shortcut: CIDR → Subnet Mask

Each octet is 8 bits. Memorize what **1 to 8 network bits** inside one octet are worth:

| Bits in octet | /1 | /2 | /3 | /4 | /5 | /6 | /7 | /8 |
|---|---|---|---|---|---|---|---|---|
| **Value** | 128 | 192 | 224 | 240 | 248 | 252 | 254 | 255 |

```text
Why? Add up the bit values from the left:
128 + 64 + 32 + 16 + 8 + 4 + 2 + 1
128 → 192 → 224 → 240 → 248 → 252 → 254 → 255
```

**To find the mask for any prefix:** break it into chunks of **/8**, then use the table for the leftover.

```text
/12 → /8 + /4         = 255.240.0.0
/18 → /8 + /8 + /2    = 255.255.192.0
/20 → /8 + /8 + /4    = 255.255.240.0
/27 → /8 + /8 + /8 + /3 = 255.255.255.224
```

```bash
# Check any CIDR quickly (Linux / macOS with ipcalc installed)
ipcalc 192.168.1.0/26
```

---

# 📦 PART 11 — IP Packet & NAT

## 63. 📦 IP Packet Anatomy

We usually think of an IP packet as *"data with a source and destination IP"*, but there's more to it.

An IP packet has **two sections**:

```text
┌──────────────────────────────┐
│  HEADER     20 – 60 bytes    │  ← routing info, error check, etc.
├──────────────────────────────┤
│  DATA       (payload)        │  ← usually ≤ 1480 bytes on Ethernet
└──────────────────────────────┘
```

- 📋 **Header:** **20 to 60 bytes**, depending on optional fields. It looks like overhead, but it's essential for **routing, error handling** and other network functions
- 📦 **Data:** the whole packet (header + data) can be up to **65,535 bytes**, but in practice the **MTU** (**Maximum Transmission Unit**) limits it. On Ethernet the MTU is **1500 bytes**
- ✂️ If a packet is bigger than the MTU, it gets **fragmented** into smaller pieces. This is generally **avoided** because it adds complexity and causes problems (a lost fragment means the whole packet is lost)

### 🔬 IPv4 header layout (32 bits per row)

```text
 0               8               16              24            31
 ├───────┬───────┼───────────────┼───────────────┴───────────────┤
 │Version│  IHL  │ Type of Svc   │         Total Length          │
 │ (4b)  │ (4b)  │ (DSCP + ECN)  │            (16b)              │
 ├───────┴───────┴───────────────┼─────┬─────────────────────────┤
 │        Identification         │Flags│     Fragment Offset     │
 │            (16b)              │(3b) │         (13b)           │
 ├───────────────┬───────────────┼─────┴─────────────────────────┤
 │ Time To Live  │   Protocol    │        Header Checksum        │
 │     (8b)      │     (8b)      │            (16b)              │
 ├───────────────┴───────────────┴───────────────────────────────┤
 │                    Source IP Address (32b)                    │
 ├───────────────────────────────────────────────────────────────┤
 │                 Destination IP Address (32b)                  │
 ├───────────────────────────────────────────────────────────────┤
 │                  Options (0 – 40 bytes)                       │
 ├───────────────────────────────────────────────────────────────┤
 │                            DATA                               │
 └───────────────────────────────────────────────────────────────┘
   5 fixed rows × 4 bytes = 20 bytes minimum header
```

### 📋 Header fields

| Field | What it does |
|---|---|
| **Version** | IP version: **4** or **6** |
| **IHL** (Internet Header Length) | Length of the header in **32-bit words** (5 = 20 bytes, 15 = 60 bytes) |
| **Type of Service** | **Prioritizes / classifies** packets (now split into **DSCP** + **ECN**) |
| **Total Length** | Total size of the packet, **header + data** (max 65,535 bytes) |
| **Identification** | Unique ID shared by all **fragments** of one packet |
| **Flags** | Control fragmentation (e.g. **DF** = Don't Fragment, **MF** = More Fragments) |
| **Fragment Offset** | **Position** of this fragment within the original packet |
| **TTL** (Time To Live) | **Hop count**: each router subtracts 1, at 0 the packet is dropped → prevents **infinite loops** |
| **Protocol** | Which upper-layer protocol is inside: **TCP (6)**, **UDP (17)**, **ICMP (1)** |
| **Header Checksum** | **Error detection** for the header only |
| **Source / Destination IP** | The **endpoints** of the communication |
| **Options** | Rarely used extras (0–40 bytes) |

> 📶 **ECN (Explicit Congestion Notification):** instead of abruptly **dropping** packets when there's congestion, routers can **mark** them, so the sender slows down **without packet loss**.

> 💡 **DevOps link:** `traceroute` works by sending packets with **TTL = 1, 2, 3...**. Each router that drops one (TTL hit 0) replies, revealing every hop.

---

## 64. 🔁 How NAT Works

**NAT (Network Address Translation)** lets many devices with **private IPs** share **one public IP**.

The router keeps a **NAT table** that maps **internal (private IP + port)** ↔ **external (public IP + port)**.

### ⚙️ The process

1. 🏠 Your home has **multiple devices**: laptops, smartphones, smart TVs
2. 🏷️ Each device has a **private IP** (e.g. `192.168.1.x`)
3. 🌍 All devices share **one public IP**, assigned to your router by your **ISP**
4. 🔄 When a device sends data to the Internet, the router **replaces** the private IP (and port) with its **public IP** (and a port), and **records the mapping** in the NAT table
5. ↩️ When the reply comes back, the router looks up the table and sends it to the **right device**

### 🖼️ NAT example

```text
   🏠 PRIVATE SIDE                    🗺️ ROUTER                     🌍 INTERNET
                              LAN: 192.168.1.1
                              WAN: 72.23.86.11 (public)

 💻 192.168.1.2                                                   🖥️ 142.250.0.0
                                                                     (Google)
 ① request
 src 192.168.1.2:3000 ─────▶  NAT rewrites source
 dst 142.250.0.0:443          src 72.23.86.11:8888 ─────────────▶ dst 142.250.0.0:443

 ③ reply                      ② reply arrives
 dst 192.168.1.2:3000 ◀─────  dst 72.23.86.11:8888 ◀───────────── src 142.250.0.0:443
                              looks up NAT table ✅
```

**NAT table**

| Private IP : port | Public IP : port | Destination |
|---|---|---|
| `192.168.1.2:3000` | `72.23.86.11:8888` | `142.250.0.0:443` |
| `192.168.1.3:5000` | `72.23.86.11:8889` | `142.250.0.0:443` |

> 🧠 Google only ever sees **72.23.86.11**. It has no idea `192.168.1.2` exists.

---

## 65. 🧩 Types of NAT

| Type | Mapping | How it works | Used for |
|---|---|---|---|
| 1️⃣ **Static NAT** | **One-to-one** | One private IP is **permanently** mapped to one public IP | A specific device (e.g. a server) that must be **reachable from the Internet** |
| 2️⃣ **Dynamic NAT** | **Many-to-many** (pool) | Router assigns a public IP **from a pool** to a device when it starts a connection; returned to the pool afterwards | Companies with several public IPs |
| 3️⃣ **PAT** (Port Address Translation) | **Many-to-one** | Also called **NAT overload**. Many devices share **one public IP**, told apart by **different port numbers** | 🏠 **Every home router** (the example in §64) |

```text
Static NAT    192.168.1.10 ───────────▶ 203.0.113.10        (always)
Dynamic NAT   192.168.1.x  ───────────▶ 203.0.113.10–20     (next free one)
PAT           192.168.1.x  ───────────▶ 203.0.113.1 : port  (one IP, many ports)
```

> 💡 **Cloud link:** an AWS **NAT Gateway** does **PAT**: private-subnet servers share one Elastic IP to reach the Internet, but nobody outside can start a connection to them.

---

## 66. 🛠️ NAT in Practice

### a. 🏠 Sharing one public IP

Multiple devices **share a single public IP** address (PAT, see §65). This is the main reason IPv4 hasn't fully run out.

### b. 🚪 Port forwarding

NAT can also let **external devices reach a service inside** your network.

Example: you run a **web server** at home.

```text
Public IP:            203.0.113.1
Internal web server:  192.168.1.10
Rule:                 203.0.113.1:80  ──▶  192.168.1.10:80

🌍 Visitor ──▶ 203.0.113.1:80 ──▶ 🗺️ Router (port forward) ──▶ 🖥️ 192.168.1.10:80
```

> 💡 **DevOps link:** `docker run -p 8080:80 nginx` is port forwarding: host port **8080** → container port **80** (Docker uses NAT rules in `iptables` to do it).

### c. ⚖️ Load balancing

NAT can **distribute incoming requests** across multiple servers by mapping **one public IP** to **many internal IPs**.

```text
Public IP:         203.0.113.1
Internal servers:  192.168.1.10, 192.168.1.11, 192.168.1.12
Rule:              round-robin

                              ┌──▶ 🖥️ 192.168.1.10   (request 1, 4, 7...)
🌍 Users ──▶ 203.0.113.1 ─────┼──▶ 🖥️ 192.168.1.11   (request 2, 5, 8...)
                              └──▶ 🖥️ 192.168.1.12   (request 3, 6, 9...)
```

> 💡 **Cloud link:** in practice this job is done by a dedicated **load balancer** (AWS ALB/NLB, Nginx, HAProxy), which uses the same idea.

---

# 🛣️ PART 12 — Routing Scenarios & ICMP

Now let's put **IP, MAC, ARP, switches, routers and NAT** together and follow a packet in **3 real scenarios**, from simplest to most complex. (Quick version of this is in §51.)

## 67. 🏠 Routing Scenario 1 — Same Network

**Host A (computer) sends a packet to Host B (printer).** Both are in the **same network** `192.168.1.0/24`, connected through a **switch**.

```text
   💻 Host A                    🔀 SWITCH                    🖨️ Host B (printer)
 192.168.1.10  ───────────────── ◀  ▶ ─────────────────────  192.168.1.20
 MAC: AA-AA                                                  MAC: BB-BB

                   sending a packet from A → B
```

### Step 1 — 📢 ARP Request

- A wants to send a packet to printer B, and it knows B's **IP** (`192.168.1.20`)
- A checks: is `192.168.1.20` in my subnet `192.168.1.0/24`? → **YES**, so it can deliver directly
- But to build a frame, A needs B's **MAC address**
- A sends an **ARP request** as a **broadcast** to everyone: *"Who has 192.168.1.20? Tell 192.168.1.10"*

### Step 2 — ↩️ ARP Reply

- **B** recognizes its own IP and replies (**unicast**) with its MAC: *"192.168.1.20 is at BB-BB"*
- A saves `192.168.1.20 → BB-BB` in its **ARP cache** (so it doesn't have to ask again)
- 🔀 Along the way, the **switch learns** which **port** each **MAC** is on (`AA-AA → port 1`, `BB-BB → port 2`) and saves it in its **MAC address table**

> ⚠️ The switch works at **Layer 2**: it maps **MAC → port**, it does **not** look at IP addresses. The **IP → MAC** mapping lives in the **host's ARP cache**.

### Step 3 — 📦 Frame transmission

- A now knows B's MAC
- A **encapsulates** the packet in a **frame** addressed to **dst MAC BB-BB**
- The switch looks up `BB-BB` in its MAC table and forwards the frame **only to B's port** ✅

```text
┌──────────────┬──────────────┬─────────────────┬─────────────────┬──────┐
│ dst MAC BB-BB│ src MAC AA-AA│ src IP .1.10    │ dst IP .1.20    │ data │
└──────────────┴──────────────┴─────────────────┴─────────────────┴──────┘
```

> 🧠 **No router involved.** Same network = ARP + switch only.

---

## 68. 🔀 Routing Scenario 2 — Different Private Networks

**Host A sends a packet to Host C**, which is in a **different private network**. A **router** connects the two networks.

```text
     PRIVATE NET 1 (192.168.1.0/24)                     PRIVATE NET 2 (10.5.3.0/24)

 💻 Host A ──── 🔀 SWITCH ──── 🗺️ ROUTER R ──────────────────────── 💻 Host C
 192.168.1.10                  192.168.1.1  |  10.5.3.1               10.5.3.2
 MAC: AA-AA                    MAC: R1      |  MAC: R2                MAC: CC-CC
                              (interface 1)   (interface 2)

                        sending a packet from A → C
```

> 🧠 A router has **one interface (with its own IP + MAC) in each network** it connects.

### Step 1 — 🚪 Determining the gateway

- A checks: is `10.5.3.2` in my subnet `192.168.1.0/24`? → **NO**
- So A can't deliver directly. It must send the packet to its **default gateway**: router R at `192.168.1.1`

### Step 2 — 📢 ARP request for the gateway

- A sends an ARP request: *"Who has **192.168.1.1**?"* (the **router's** IP, not C's!)
- Router R replies with its MAC (**R1**)

### Step 3 — 📦 Frame transmission to the gateway

- A sends the packet in a frame addressed to the **router's MAC**:

```text
dst MAC = R1 (router)      ← next hop
dst IP  = 10.5.3.2 (C)     ← final destination
```

### Step 4 — 🗺️ Router processing

1. Router R receives the frame, removes the L2 header, and checks the **destination IP** (`10.5.3.2`)
2. It looks at its **routing table** → `10.5.3.0/24` is directly connected on **interface 2**
3. It decreases the **TTL** by 1
4. It sends an **ARP request** on network 2: *"Who has 10.5.3.2?"* → C replies with **CC-CC**
5. It builds a **new frame** (`src MAC R2 → dst MAC CC-CC`) and forwards the packet to C ✅

> 🧠 The **MAC addresses changed** (A→R1, then R2→C) but the **IP addresses stayed the same** (`192.168.1.10 → 10.5.3.2`) the whole way.

---

## 69. 🌍 Routing Scenario 3 — To a Server on the Internet

**Host M (your phone) sends a packet to Host S (a server on the Internet).** Now **NAT** joins the party.

```text
     PRIVATE NET (192.168.1.0/24)                      🌍 INTERNET

 📱 Host M ────────── 🗺️ ROUTER (+ NAT) ──────────── ☁️ many routers ──────── 🖥️ Host S
 192.168.1.3          192.168.1.1 | 1.2.3.4                                    142.250.0.0
                      (private)     (public)

                        sending a packet from M → S
```

### Step 1 — 🚪 Determining the gateway

- M wants to send a packet to S (`142.250.0.0`)
- M checks: is `142.250.0.0` in my subnet `192.168.1.x`? → **NO** → send to the **default gateway** (`192.168.1.1`)

### Step 2 — 📢 ARP request for the gateway

- M sends an ARP request: *"Who has 192.168.1.1?"* → the router replies with its MAC
- (if the router's MAC is already in M's **ARP cache**, this step is skipped)
- M sends the packet in a frame addressed to the **router's MAC**

### Step 3 — 🔁 Router processing & NAT

- The router receives the frame and checks the destination IP (`142.250.0.0`) → not a local network, so it goes out the **Internet (WAN) side**
- 🔁 **NAT:** the router **replaces the private source IP** with its **public IP** and records it in the **NAT table** (see §64):

```text
BEFORE NAT   src 192.168.1.3:5000   →  dst 142.250.0.0:443
AFTER NAT    src 1.2.3.4:6000       →  dst 142.250.0.0:443
NAT table    192.168.1.3:5000  ↔  1.2.3.4:6000
```

### Step 4 — 🌍 Internet routing

- The packet is routed through **many routers** (ISP → backbone → Google's network) to reach `142.250.0.0`
- Each router forwards the packet based on the **destination IP** and its own **routing table**, decrements **TTL**, and builds a **new frame** for the next hop
- When S replies to `1.2.3.4:6000`, your router looks up the NAT table and sends it back to **192.168.1.3:5000** (your phone) ✅

### 📊 The 3 scenarios compared

| | Scenario 1 | Scenario 2 | Scenario 3 |
|---|---|---|---|
| Destination | Same network | Different private network | Internet |
| ARP for... | **Destination's** MAC | **Gateway's** MAC | **Gateway's** MAC |
| Devices used | Switch | Switch + router | Switch + router + NAT + Internet routers |
| IP changes? | No | No | **Source IP changes** (NAT) |
| MAC changes? | No | Yes, at the router | Yes, at **every** hop |

---

## 70. 📡 ICMP — Internet Control Message Protocol

**ICMP** (**Internet Control Message Protocol**) lives at **Layer 3 (Network)**.

- 🧩 It works **on top of IP**: ICMP messages travel **inside IP packets** (IP header **Protocol = 1**, see §63)
- 💬 It's used to send **informational and error messages** between network devices. It does **not** carry user data
- 🛠️ If you've ever used **`ping`** or **`traceroute`**, you've used ICMP
- 🔍 Crucial for **troubleshooting** network problems
- 📶 Helps keep the network efficient by giving **feedback on errors and problems** (e.g. *"that host is unreachable"*, *"your packet is too big"*)

```text
┌───────────┬──────────────────────────────┐
│ IP header │ ICMP message (type + code…)  │   ← ICMP rides inside IP
│ proto = 1 │                              │
└───────────┴──────────────────────────────┘
```

### 📋 ICMP messages

| Message | What it means | Used by |
|---|---|---|
| 📤 **Echo Request** / 📥 **Echo Reply** | *"Are you there?"* / *"Yes, I'm here"*: checks if a host is reachable | `ping` |
| 🚫 **Destination Unreachable** | The destination **network, host or port** can't be reached | Routers, hosts |
| ✂️ **Fragmentation Needed** | Packet is **too big** for the next link (MTU) but has the **Don't Fragment** flag set → sender must send smaller packets | Path MTU Discovery |
| ⏱️ **Time Exceeded (TTL exceeded)** | The packet's **TTL hit 0** and it was dropped | `traceroute` |
| ↪️ **Redirect** | A router telling a device *"use a better route / gateway for this destination"* | Routers |

### ⚠️ ICMP limitations

- 🧱 **Some firewalls block ICMP** for security reasons (e.g. to prevent **ping floods** or network scanning). That makes **troubleshooting harder**: a server may be up but not answer `ping`
- 🕳️ Blocking **all** ICMP can break things. Example: the **"black hole" connection** problem. The TCP connection is established, but large packets silently vanish because the **"Fragmentation Needed"** messages are blocked, so the sender never learns to send smaller packets
- 📭 ICMP messages themselves have **no guaranteed delivery** (no retries, no acknowledgement)

> 💡 **Cloud link:** AWS Security Groups **block ICMP by default**. That's why `ping` to a fresh EC2 instance times out even though SSH works. Allow **"All ICMP – IPv4"** to enable it.

---

## 71. 🏓 Ping & Traceroute

### 🏓 Ping

**Ping** uses ICMP to check whether a host is **up and reachable**:

1. Your machine sends an **ICMP Echo Request**
2. If the host is reachable, it responds with an **ICMP Echo Reply**
3. Ping measures the **round-trip time** (how long the reply took)

```bash
ping chaicode.com        # runs until you press Ctrl+C (macOS / Linux)
ping -c 4 chaicode.com   # send only 4 pings
```

```text
PING chaicode.com (104.21.16.156): 56 data bytes
64 bytes from 104.21.16.156: icmp_seq=0 ttl=59 time=153.834 ms
64 bytes from 104.21.16.156: icmp_seq=1 ttl=59 time=155.758 ms
64 bytes from 104.21.16.156: icmp_seq=2 ttl=59 time=156.631 ms
64 bytes from 104.21.16.156: icmp_seq=3 ttl=59 time=157.014 ms
```

| Field | Meaning |
|---|---|
| `104.21.16.156` | The IP the domain resolved to (via **DNS**) |
| `56 data bytes` / `64 bytes` | 56 bytes of data + 8-byte ICMP header = 64 bytes |
| `icmp_seq` | Sequence number of each ping: **0, 1, 2, 3…** (a gap = a lost packet) |
| `ttl=59` | TTL left when the reply arrived (started at 64 → about **5 hops** away) |
| `time` | **Round-trip time (latency)** in milliseconds |

### 🗺️ Traceroute

**Traceroute** shows the **path** (every router) a packet takes to the destination:

1. It sends packets with **TTL = 1**, then **TTL = 2**, then **3**… (gradually increasing)
2. Each router along the path **decrements the TTL**
3. When the TTL reaches **0**, that router drops the packet and sends back an **ICMP Time Exceeded** message, revealing its address
4. Repeating this maps **every hop** until the destination answers

```text
TTL=1 ──▶ Router 1 ✋ "Time Exceeded" → hop 1 = Router 1
TTL=2 ──▶ Router 1 ──▶ Router 2 ✋     → hop 2 = Router 2
TTL=3 ──▶ Router 1 ──▶ Router 2 ──▶ Router 3 ✋ → hop 3 …
...until the destination itself replies ✅
```

```bash
traceroute chaicode.com   # macOS / Linux
tracert chaicode.com      # Windows
```

```text
traceroute: Warning: chaicode.com has multiple addresses; using 172.67.213.172
traceroute to chaicode.com (172.67.213.172), 64 hops max, 40 byte packets
 1  dsldevice.lan (192.168.1.1)  5.225 ms  3.322 ms  2.416 ms
 2  106.213.111.255 (106.213.111.255)  8.970 ms  8.489 ms  8.541 ms
 3  nsg-corporate-153.212.186.122.airtel.in (122.186.212.153)  12.660 ms
 ...
 7  172.67.213.172 (172.67.213.172)  111.749 ms  109.043 ms
```

| Hop | What it is |
|---|---|
| **1** `192.168.1.1` | Your **home router** (default gateway) |
| **2–3** `airtel.in` | Your **ISP's** routers |
| **…** | Backbone / IXP routers (a line of `* * *` means that router doesn't reply to ICMP) |
| **7** `172.67.213.172` | The **destination** (Cloudflare, which hosts chaicode.com) ✅ |

> 🧠 Each hop shows **3 times** because traceroute sends **3 probes** per TTL. "Multiple addresses" = the site sits behind a CDN with several IPs (**anycast**, see §40).

---

# 🎯 PART 13 — Interview Quick Answers

## 72. 💬 Common Questions

| Question | Short answer |
|---|---|
| What is a network? | Devices connected to share data and resources |
| What is a host? | Any device that has an IP address |
| What is the Internet? | A network of networks |
| Internet vs WWW? | Internet = infrastructure; WWW = service on top (HTML + HTTP + URL) |
| Who invented the WWW? | Tim Berners-Lee, 1991 |
| Client vs server? | Client requests; server listens on a port and responds |
| LAN vs WAN? | LAN = small area (office); WAN = countries/continents (Internet) |
| Most common topology? | Star |
| Most reliable topology? | Mesh |
| What is the OSI model? | 7-layer conceptual framework for network communication, by ISO |
| Which layer does routing? | Layer 3 — Network (Router, IP) |
| Which layer uses MAC addresses? | Layer 2 — Data Link (Switch) |
| Which layer uses ports? | Layer 4 — Transport (TCP/UDP) |
| Which layer does encryption? | Layer 6 — Presentation |
| TCP vs UDP? | TCP = reliable, ordered, slower; UDP = fast, no guarantee |
| What is encapsulation? | Each layer adds its header (L2 also adds a trailer) as data goes down the stack |
| What is decapsulation? | The opposite — the receiver removes headers going up the stack |
| What is a PDU? | The name of the data at each layer: Segment/Datagram (L4), Packet (L3), Frame (L2), Bits (L1) |
| What is a payload? | The contents carried inside a PDU — e.g. a frame's payload is a packet |
| IP vs MAC? | IP = logical, changes with network; MAC = physical, fixed to NIC |
| OSI vs TCP/IP? | OSI = theory (7 layers); TCP/IP = what the Internet uses (4/5 layers) |
| Unicast vs broadcast vs multicast vs anycast? | One-to-one · one-to-all · one-to-group · one-to-nearest |
| Example of anycast? | DNS resolver `1.1.1.1` — same IP on hundreds of servers, nearest one answers |
| What is a NIC? | Network Interface Card — hardware that connects a device to a network; works at L1 + L2 |
| What is a MAC address? | Unique hardware address burned into every NIC at the factory |
| Hub vs bridge? | Hub (L1) sends to all ports; bridge (L2) uses MAC addresses and forwards only when needed |
| Hub vs switch? | Hub (L1) sends to all ports; switch (L2) uses a MAC table and sends only to the right port |
| Switch vs router? | Switch (L2, MAC) connects devices inside a LAN; router (L3, IP) connects different networks |
| What is a modem? | Modulator-demodulator — converts digital data to the ISP line's signal and back (L1) |
| Modem vs router? | Modem connects your home to the ISP; router shares that connection with your devices |
| What is a default gateway? | The router IP a device sends traffic to when the destination is outside its network |
| What is an ISP? | Internet Service Provider — connects you to the Internet; works in tiers (Tier 1 backbone → Tier 2 → Tier 3 local) |
| What is an IXP? | Internet Exchange Point — where ISPs connect directly to exchange traffic |
| What is a firewall? | A device/software that allows or blocks traffic using rules (IP, port, protocol) |
| Stateful vs stateless firewall? | Stateful remembers connections (AWS Security Group); stateless checks each packet alone (AWS NACL) |
| How do two hosts on the same network talk? | ARP finds the destination MAC, the switch delivers the frame |
| How does a host reach a different network? | Sends the frame to the default gateway's MAC; routers forward it hop by hop using IP |
| What changes at each hop — MAC or IP? | MAC changes every hop; IP stays the same end to end (except NAT) |
| Why do we need IP if we have MAC? | MAC only works inside a LAN; IP is a global, routable address routers use across networks |
| Two parts of an IP address? | Network ID (which network) + Host ID (which device); the subnet mask decides the split |
| IPv4 vs IPv6? | IPv4 = 32-bit, ~4.3 billion addresses; IPv6 = 128-bit, ~3.4 × 10³⁸ addresses, no NAT needed |
| Private IP ranges? | `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` (RFC 1918) |
| Private vs public IP? | Private = only inside the LAN, reusable; public = globally unique, visible on the Internet |
| What is 127.0.0.1? | Loopback / localhost: always the device itself, traffic never leaves the machine |
| Who assigns public IPs? | IANA → 5 RIRs (ARIN, APNIC, LACNIC, RIPE NCC, AFRINIC) → ISPs |
| Dynamic vs static IP? | Dynamic = auto-assigned by DHCP, can change; static = fixed, used for servers (AWS Elastic IP) |
| What is DHCP? | Protocol that auto-assigns IPs with a lease: Discover → Offer → Request → Acknowledge (DORA) |
| When do you need a static IP? | When something must always find you at the same address: servers, DNS records, public services |
| What is a subnet? | A logical division of a large IP network into smaller, isolated segments (better security + less broadcast noise) |
| What does a subnet mask do? | Separates network bits (1s) from host bits (0s), deciding whether an IP is in the same subnet |
| Classful vs classless? | Classful = fixed masks per class (A /8, B /16, C /24), wasteful; classless (CIDR) = any prefix length you need |
| What does /24 mean? | First 24 bits are network → 8 host bits → 256 addresses, 254 usable |
| Usable hosts formula? | 2^(32 − prefix) − 2 (network + broadcast address reserved) |
| Convert /20 to a mask? | /8 + /8 + /4 → 255.255.240.0 |
| IPv4 header size? | 20 bytes minimum, up to 60 bytes with options |
| What is MTU? | Maximum Transmission Unit: largest packet a link carries without fragmenting (1500 bytes on Ethernet) |
| What is TTL? | Hop counter; each router subtracts 1, packet dropped at 0, which prevents infinite loops |
| What is NAT? | Router rewrites private IP:port to its public IP:port and tracks it in a NAT table |
| Types of NAT? | Static (1:1), Dynamic (pool, many:many), PAT / NAT overload (many:1 using ports) |
| What is port forwarding? | A NAT rule sending traffic from public IP:port to an internal IP:port (e.g. `docker -p 8080:80`) |
| Same network: how does A reach B? | Subnet check → ARP broadcast for B's MAC → B replies → switch forwards the frame to B's port |
| Different network: who does A ARP for? | The default gateway (router), not the destination; dst MAC = router, dst IP = final host |
| What does a router do with a packet? | Strips the frame, checks dst IP in its routing table, decrements TTL, ARPs for the next hop, sends a new frame |
| Does the switch know IP addresses? | No. A switch maps MAC → port; the IP → MAC mapping is in the host's ARP cache |
| What is ICMP? | Layer 3 control/error protocol carried inside IP (protocol 1); used by ping and traceroute |
| Common ICMP messages? | Echo Request/Reply, Destination Unreachable, Fragmentation Needed, Time Exceeded, Redirect |
| How does ping work? | Sends ICMP Echo Request, host answers with Echo Reply; shows round-trip time and TTL |
| How does traceroute work? | Sends packets with TTL 1, 2, 3…; each router where TTL hits 0 returns ICMP Time Exceeded, revealing the path |
| Why can't I ping my EC2 instance? | Security Groups block ICMP by default; allow ICMP inbound |
| Why not block all ICMP? | Breaks Path MTU Discovery ("black hole" connections) and makes troubleshooting harder |

---

# ✅ PART 14 — Cheat Sheets & Mental Model

## 73. 📊 OSI Layer Cheat Sheet

| # | Layer | Unit | Device | Address | Protocols |
|---|---|---|---|---|---|
| 7 | Application | Data | — | — | HTTP, DNS, SSH, SMTP |
| 6 | Presentation | Data | — | — | SSL/TLS, JPEG |
| 5 | Session | Data | — | — | Sessions, auth |
| 4 | Transport | **Segment** | — | **Port** | TCP, UDP |
| 3 | Network | **Packet** | **Router** | **IP** | IP, ICMP |
| 2 | Data Link | **Frame** | **Switch** | **MAC** | Ethernet, ARP |
| 1 | Physical | **Bits** | **Hub, Cable, NIC** | — | — |

---

## 74. 🔢 Common Ports to Remember

| Port | Service |
|---|---|
| 21 | FTP |
| 22 | SSH |
| 25 | SMTP (email) |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |
| 3306 | MySQL |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 27017 | MongoDB |

---

## 75. 🧾 Concept Cheat Sheet

```text
NETWORK            → devices sharing data & resources
HOST               → any device with an IP address
INTERNET           → network of networks (infrastructure)
WWW                → service on the Internet (HTML + HTTP + URL), 1991

CLIENT             → makes requests
SERVER             → listens on a port & responds

PAN < LAN < MAN < WAN       (Internet = biggest WAN)
VPC ≈ LAN in the cloud      Region + AZs ≈ MAN

BUS   → one shared cable
RING  → circular loop
STAR  → central switch      (most common)
MESH  → everyone ↔ everyone (most reliable)
TREE  → hierarchy (bus + star)

OSI (7)    → All People Seem To Need Data Processing
TCP/IP (5) → Application, Transport, Network, Data Link, Physical

PORT       → Layer 4 → which APP
IP         → Layer 3 → which HOST     → Router
MAC        → Layer 2 → which DEVICE on local network → Switch
BITS       → Layer 1 → signals on the wire

Client: RAW → ENCRYPTED → SEGMENT → PACKET → FRAME → BITS
Server: BITS → FRAME → PACKET → SEGMENT → DECRYPTED → RAW

ENCAPSULATION → add headers going DOWN   (sender)
DECAPSULATION → remove headers going UP  (receiver)
PDU           → Segment/Datagram (L4) · Packet (L3) · Frame (L2) · Bits (L1)
PAYLOAD       → frame carries packet · packet carries segment · segment carries data

UNICAST    → one to one       (Netflix, API call, SSH)
BROADCAST  → one to all       (ARP, stays in LAN)
MULTICAST  → one to group     (live stream to subscribers)
ANYCAST    → one to nearest   (DNS 1.1.1.1)

NIC    → L1 + L2, has MAC address (wired / wireless)
HUB    → L1, sends to ALL ports (dumb)
BRIDGE → L2, MAC table, connects 2 segments, forwards only when needed
SWITCH  → L2, MAC table, sends only to the right port (multi-port bridge)
ROUTER  → L3, IP + routing table, connects different networks, NAT at home
MODEM   → L1, digital ↔ ISP line signal (modulate / demodulate)
GATEWAY → door to other networks = your router's IP (192.168.1.1)

ISP      → connects you to the Internet · Tier 1 (global) → Tier 2 (national) → Tier 3 (local)
IXP      → where ISPs plug into each other
FIREWALL → allow/deny by IP + port + protocol · first match wins · default deny
           stateful = Security Group · stateless = NACL

Same network      → ARP for destination MAC → switch delivers
Different network → ARP for GATEWAY MAC → router → hop by hop
MAC = next hop (changes) · IP = final destination (same)

IP ADDRESS → Layer 3 global address = Network ID + Host ID (split by subnet mask)
IPv4       → 32 bits, 4 octets (0–255), ~4.3 billion, exhausted
IPv6       → 128 bits, 8 hex groups, ~3.4 × 10³⁸, no NAT needed
PRIVATE    → 10.0.0.0/8 · 172.16.0.0/12 · 192.168.0.0/16 (RFC 1918), LAN only
PUBLIC     → globally unique, given by ISP ← RIR ← IANA
LOOPBACK   → 127.0.0.1 / ::1 = localhost (never leaves the machine)
DYNAMIC IP → DHCP (DORA), leased, can change
STATIC IP  → fixed, for servers (AWS Elastic IP)

SUBNET      → smaller isolated piece of a network (security + less broadcast)
SUBNET MASK → 1s = network, 0s = host
CLASSFUL    → A 1–126 /8 · B 128–191 /16 · C 192–223 /24 · D multicast · E experimental
CIDR        → IP/prefix, e.g. 192.168.1.0/24 · hosts = 2^(32−prefix) − 2
MASK TRICK  → 128 192 224 240 248 252 254 255  (/1 … /8 inside an octet)
              /12 = 255.240.0.0 · /18 = 255.255.192.0

IP PACKET   → header 20–60 bytes + data · MTU 1500 · TTL stops loops
NAT         → private IP:port ↔ public IP:port (NAT table)
NAT TYPES   → Static 1:1 · Dynamic pool · PAT many:1 (home routers, AWS NAT GW)
NAT USES    → share one IP · port forwarding · load balancing

ROUTING 1   → same net: ARP for dest MAC → switch → done
ROUTING 2   → other net: ARP for GATEWAY → router → ARP for dest → new frame
ROUTING 3   → Internet: gateway → NAT (src IP → public) → routers hop by hop
ICMP        → L3, inside IP (proto 1), control & error messages
ICMP MSGS   → Echo Req/Reply · Dest Unreachable · Frag Needed · Time Exceeded · Redirect
PING        → Echo Request → Echo Reply · shows RTT, TTL, lost packets
TRACEROUTE  → TTL 1,2,3… → each hop returns Time Exceeded → maps the path

Home: devices → switch → router/firewall (gateway) → modem → ISP → IXP/Tier 1 → server
```
