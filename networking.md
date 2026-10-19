# 🌐 Networking — Complete Notes (Basics → Topologies → OSI → TCP/IP → Devices → Interview)

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
- **Part 9 — Interview Quick Answers** (§53)
- **Part 10 — Cheat Sheets & Mental Model** (§54–56)

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

**MAC address** → a **12-digit alphanumeric** (hexadecimal) number of your computer's **network interface (NIC)**.

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
   │                ┌──────────── TRANSPORT LAYER ──────┐ └─ Gmail   → PORT 25  (SMTP)
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
2. 🚚 **Transport** — adds port **443** so the server knows it's for the web app (Gmail mail uses **25**)
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

# 🎯 PART 9 — Interview Quick Answers

## 53. 💬 Common Questions

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

---

# ✅ PART 10 — Cheat Sheets & Mental Model

## 54. 📊 OSI Layer Cheat Sheet

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

## 55. 🔢 Common Ports to Remember

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

## 56. 🧾 Concept Cheat Sheet

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

Home: devices → switch → router/firewall (gateway) → modem → ISP → IXP/Tier 1 → server
```




Network layer && IP Addressing

In Previous chapters we covered the physical layer and data link layer you now know that a mac address identifies a device on a local network 
but here is the problme MAC addresses only work locally within a lan 
the moment your data needs to leave your local network and travel across the internet to a server in another country MAC addresses are useless they are not designed for that 
we need a different addressing system. one that works at a global scale one that every device on the internet understands one that routers can use to make decisions about where to send your data 

IP addressing 
An ip address (internet protocal address) is a unique numerical lable assigned to every device on a network 
An IP address has two parts:
   . Network Portion identifies the network 
   . host portion: identifies the specific device within the network.
                         Host ID
            172.217.14.206
     network id   

There are two versions of ip addresses in use today IPv4 and IPv6 


IPv4
An IPv4 address looks like this 192.168.1.1
four numbers separated by dots.
Each number - called an octet which can range from 0 to 255.
so a full IPv4 address is 32 bits of information four group of 8 bits each 
two to the power of 32 gives us approximately 4.3 billion addreses.

in 1983 when IPv4 was designed -4.3 billion seemed like more than enough nobody imagined billions of smartphones, IOt devices laptops and serevers all needing unique addresses.


IPv6 
the long-term solution to address exhaustion is IPv6- the next generation of ip addressing introduced in 1998 and slowly becoming the standard 

An IPv6 address looks like this 2001:0db8:85a3:0000:0000:8a2e:0370:7334
Eight groups of four hexadecimal characters,separated bt colons that is 128 bits.

Two to the power of 128 that is approximately 340*10^36 addresses
IPv6 also brings other improvements like better security built in more efficient routing no need for NAT.
BUt adoption has been slow becasue changing internet infrastructure is genuinely hard today the internet runs on a mix of both IPv4 and IPv6 

Nature of IP
if you open your terminal and run ifconfig on Mac or linux or ipconfig on windows and look for the "inet" filed next to your active network interface you will get your current ip address starting with 192.168 or 10 172.16.
But here is something interesting Go to Google right now and search "what is my ip" you will get a completely different address back some device two different ip addresses why ?
because there are two kinds of ip addresses private and public 
one more special address worth knowing 127.0.0.1 this is called the loopback address also known as localhost it always refers to the device itself. 
when you run a local development server and open your browser to localhost:3000 that 127.0.0.1 never leaves your macghine it looops back to itself.


two type of ip 
private and public 


Private ip 
- It only works within a local network it is not visbile to the outside internet 
- it cannot be accessed from outside your home or office network directyl 
- when your router assigns an ip address to your laptop your phone your smart TV those are private IPs they exist only within your LAN

your neighbour's network could be using the exact same private ip range as your s and thar is completely fine because private IPs never leave the local network 

there are three reserved ranges for private IPs and these are defined by standard caleed RFC 1918.

Private IP

Range.                                Addresses available                   common use

10.0.0.0 - 10.255.255.255               ~16 million                      Large enterprise.cloud VPCs

172.16.0.0 -172.31.255.255              ~1 million                         Mid-size network 

192.168.0.0-192.168.255.255             ~65,000                         Home & Small office networks 


Public IP

It's the address that is visible to the rest of the internet.
it is globally unique no two devices on the internet can have the same public ip at the same time 
your home network has one public IP -assigned yo your router by your ISP every device in your house your laptop your phone your tablet all share that one public Ip when talking to the internet 
that is the address google sees when you make a serach. that is the address netflix sees when you stram a video 

public ip are mananged and assigned by orgs called Regional internet registies.

ARIN- America registry informatin center 
APNIC- Aisa pacific Network information center.
LATNIC- latin america network information center 
RIPE NCC- RIPE network co-ordination center
AFRNIC- Africa network information center

they are responsible for ensuring no two organisations get the same public ip

Dynamic ip 
Dynamic ip address in one that is assigned automatically and can change over time 
this is what happens on most home and office networks 
when your laptop connects to wifi your router hands it an available Ip address from its pool.
next time you connect you might get a different one 

the address us keased for period of time and when the lease expires it can be renewed or reassigned 
dynamic ips are the default almost everywhere becasue they are efficient 
