// All exam-style questions with model answers and mark-scheme keywords
// Source: IB CS Theme A Exam Practice Guide (2024 syllabus)

window.QUIZ_DATA = [
  // ============ A2.1 NETWORK FUNDAMENTALS ============
  {
    id: 'A2.1-Q1A', topic: 'A2.1', marks: 1, command: 'Define',
    title: { en: 'Local Area Networks', ru: 'Локальные сети' },
    q: {
      en: 'Define the term Local Area Network (LAN).',
      ru: 'Дайте определение термина «локальная сеть» (LAN).'
    },
    keywords: ['limited geographical', 'small area', 'short distance', 'site', 'building', 'connects devices', 'network'],
    keywordsRu: ['ограниченной территории', 'небольшой', 'здание', 'площадка', 'устройства'],
    model: {
      en: ['A LAN is a network that connects devices/computers over a <b>limited geographical area</b> — such as a single room, building or site.'],
      ru: ['Достаточно одной точной фразы: сеть, соединяющая устройства на <b>ограниченной территории</b> (комната, здание, одна площадка). Командный термин Define = точное определение без объяснений.']
    }
  },
  {
    id: 'A2.1-Q1B', topic: 'A2.1', marks: 2, command: 'Outline',
    title: { en: 'VPN infrastructure', ru: 'Инфраструктура VPN' },
    q: {
      en: 'Outline how a Virtual Private Network (VPN) can reduce the need for expensive dedicated networking infrastructure over long distances.',
      ru: 'Опишите кратко, как VPN снижает потребность в дорогой выделенной инфраструктуре на больших расстояниях.'
    },
    keywords: ['encrypted', 'tunnel', 'public internet', 'no dedicated lines', 'cheap', 'secure'],
    keywordsRu: ['шифрованный', 'туннель', 'публичный интернет', 'выделенные линии', 'не нужны'],
    model: {
      en: [
        'A VPN creates a secure, encrypted <b>tunnel</b> over the existing <b>public internet</b> (1).',
        'This removes the need to buy or lease expensive dedicated physical lines between remote sites — the organisation reuses cheap internet connectivity (1).'
      ],
      ru: ['Два балла = два пункта: (1) шифрованный туннель через публичный интернет; (2) поэтому не нужны дорогие выделенные линии между офисами.']
    }
  },
  {
    id: 'A2.1-Q2A', topic: 'A2.1', marks: 2, command: 'Distinguish',
    title: { en: 'Cloud vs Edge', ru: 'Облако и Edge' },
    q: {
      en: 'Distinguish between Edge computing and Cloud computing in the context of global video streaming.',
      ru: 'Различите граничные (edge) и облачные вычисления в контексте глобального видеостриминга.'
    },
    keywords: ['centralised', 'remote data centre', 'distributed', 'near the user', 'latency', 'closer'],
    keywordsRu: ['централизовано', 'дальних', 'распределённо', 'рядом', 'задержку'],
    model: {
      en: [
        '<b>Cloud:</b> centralised processing/storage in remote data centres (1).',
        '<b>Edge:</b> distributed processing near the user, so streaming content is served from servers close to viewers to cut latency/buffering (1).'
      ],
      ru: ['Различие = по одному признаку каждого: облако — централизованно в дальних ЦОД; edge — распределённо рядом с пользователем, что снижает задержку при стриминге.']
    }
  },
  {
    id: 'A2.1-Q2C', topic: 'A2.1', marks: 2, command: 'Discuss',
    title: { en: 'Privacy & the cloud', ru: 'Приватность и облако' },
    q: {
      en: 'Discuss one social or privacy concern associated with using third-party Cloud infrastructure for sensitive data.',
      ru: 'Обсудите одну социальную проблему/проблему приватности при использовании стороннего облака для чувствительных данных.'
    },
    keywords: ['data sovereignty', 'foreign country', 'laws', 'third-party', 'breach', 'control'],
    keywordsRu: ['суверенитет', 'данных', 'законам', 'утечки', 'контроля'],
    model: {
      en: [
        '<b>Data sovereignty:</b> data physically stored in another country is subject to that country\'s laws, which may allow government access (1).',
        '<b>Third-party risk:</b> the owner must trust the provider\'s security; a breach or unauthorised access would expose sensitive data — a loss of control over one\'s own data (1).'
      ],
      ru: ['«Discuss» = назвать проблему и развить её. Подойдёт «суверенитет данных» (данные подчиняются законам чужой страны) либо «зависимость от безопасности провайдера» (риск утечки, потеря контроля).']
    }
  },
  {
    id: 'A2.1-Q3A', topic: 'A2.1', marks: 2, command: 'Distinguish',
    title: { en: 'Router vs Switch', ru: 'Маршрутизатор и коммутатор' },
    q: {
      en: 'Distinguish between the function of a Router and a Network Switch.',
      ru: 'Различите функции маршрутизатора и сетевого коммутатора.'
    },
    keywords: ['within same LAN', 'MAC address', 'different networks', 'IP address', 'routing'],
    keywordsRu: ['внутри одной', 'MAC', 'разные сети', 'IP'],
    model: {
      en: [
        '<b>Switch:</b> connects devices <b>within the same LAN</b>, forwarding frames by <b>MAC address</b> (1).',
        '<b>Router:</b> connects <b>different networks</b> together (e.g. a LAN to the internet), forwarding packets by <b>IP address</b> (1).'
      ],
      ru: ['Ключ к различию: коммутатор — внутри одной сети по MAC; маршрутизатор — между сетями по IP.']
    }
  },
  {
    id: 'A2.1-Q4A', topic: 'A2.1', marks: 3, command: 'Distinguish',
    title: { en: 'TCP vs UDP', ru: 'TCP против UDP' },
    q: {
      en: 'Distinguish between TCP and UDP regarding reliability.',
      ru: 'Различите TCP и UDP с точки зрения надёжности.'
    },
    keywords: ['connection-oriented', 'acknowledgements', 'sequencing', 'retransmission', 'reliable', 'connectionless', 'no delivery guarantee', 'faster'],
    keywordsRu: ['соединения', 'подтверждения', 'порядок', 'повтор', 'без гарантий', 'быстрее'],
    model: {
      en: [
        '<b>TCP</b> is connection-oriented and uses <b>acknowledgements, sequencing and retransmission</b>, guaranteeing reliable, in-order delivery (1–2).',
        '<b>UDP</b> is connectionless with <b>no delivery guarantee</b> (no acknowledgements), so packets may be lost — but it is faster with less overhead (1).'
      ],
      ru: ['На 3 балла: механизм надёжности TCP (подтверждения, порядок, повтор) + что UDP без гарантий + что UDP быстрее. Полезно явно противопоставить.']
    }
  },
  {
    id: 'A2.1-Q5', topic: 'A2.1', marks: 2, command: 'Outline', hl: true,
    title: { en: 'Port numbers (HL)', ru: 'Номера портов (HL)' },
    q: {
      en: 'Outline the purpose of a Port Number when a server is running multiple applications.',
      ru: 'Опишите назначение номера порта, когда сервер обслуживает несколько приложений.'
    },
    keywords: ['identifies', 'specific application', 'process', 'multiplexing', 'multiple services', 'single IP'],
    keywordsRu: ['идентификатор', 'приложения', 'много сервисов', 'один IP'],
    model: {
      en: [
        'A port number uniquely identifies a specific application/process on the host (1).',
        'This lets a single IP address run many services at once and routes each incoming packet to the correct application (multiplexing) (1).'
      ],
      ru: ['Порт = идентификатор приложения; благодаря ему один IP-адрес обслуживает много сервисов, а входящие данные попадают в нужное приложение.']
    }
  },

  // ============ A2.2 DEVICES & TRANSMISSION ============
  {
    id: 'A2.2-Q1', topic: 'A2.2', marks: 2, command: 'Outline',
    title: { en: 'The modem', ru: 'Модем' },
    q: {
      en: 'Outline the specific function of a modem in connecting a network to an ISP.',
      ru: 'Опишите функцию модема при подключении сети к интернет-провайдеру.'
    },
    keywords: ['modulates', 'demodulates', 'digital', 'analogue', 'ISP', 'signal'],
    keywordsRu: ['модулирует', 'демодулирует', 'цифровой', 'аналоговый'],
    model: {
      en: [
        'A modem <b>modulates</b> digital data from the network into an analogue signal suitable for the line (1).',
        'and <b>demodulates</b> incoming analogue signals back into digital data — bridging the digital network and the ISP\'s line (1).'
      ],
      ru: ['Название = функция: модуляция цифра→аналог и демодуляция аналог→цифра, что связывает цифровую сеть с линией провайдера.']
    }
  },
  {
    id: 'A2.2-Q2', topic: 'A2.2', marks: 2, command: 'Contrast',
    title: { en: 'Switch vs Router', ru: 'Коммутатор и маршрутизатор' },
    q: {
      en: 'Contrast how a switch forwards data within a LAN versus how a router forwards data between networks.',
      ru: 'Сравните (по различиям), как коммутатор передаёт данные внутри LAN и как маршрутизатор — между сетями.'
    },
    keywords: ['frames', 'MAC', 'Data-Link', 'packets', 'IP', 'routing table', 'Network layer'],
    keywordsRu: ['кадры', 'MAC', 'канальный', 'пакеты', 'IP', 'маршрутизации'],
    model: {
      en: [
        '<b>Switch:</b> forwards frames to a specific port within the LAN using the destination <b>MAC address</b> (Data-Link layer) (1).',
        '<b>Router:</b> forwards packets between networks using the destination <b>IP address</b> and a routing table (Network layer) (1).'
      ],
      ru: ['Коммутатор — внутри LAN по MAC (канальный уровень); маршрутизатор — между сетями по IP и таблице маршрутизации (сетевой уровень).']
    }
  },
  {
    id: 'A2.2-Q3', topic: 'A2.2', marks: 4, command: 'Identify',
    title: { en: 'Layer mapping', ru: 'Уровни TCP/IP' },
    q: {
      en: 'Identify the TCP/IP layers for a router and a switch, and state the addressing each uses.',
      ru: 'Определите уровни модели TCP/IP для маршрутизатора и коммутатора и укажите используемую адресацию.'
    },
    keywords: ['Internet', 'Network layer', 'IP', 'Data-Link', 'MAC'],
    keywordsRu: ['межсетевой', 'сетевой', 'IP', 'канальный', 'MAC'],
    model: {
      en: [
        '<b>Router</b> → operates at the <b>Internet/Network layer</b> (1), using <b>IP addresses</b> (1).',
        '<b>Switch</b> → operates at the <b>Network Access/Data-Link layer</b> (1), using <b>MAC addresses</b> (1).'
      ],
      ru: ['Четыре балла = уровень + тип адреса для каждого устройства.']
    }
  },
  {
    id: 'A2.2-Q4', topic: 'A2.2', marks: 3, command: 'Explain',
    title: { en: 'Fibre optic properties', ru: 'Свойства оптоволокна' },
    q: {
      en: 'Explain one technical advantage and one limitation of using fibre optic cables for a university backbone.',
      ru: 'Объясните одно преимущество и одно ограничение оптоволокна для магистрали университета.'
    },
    keywords: ['light pulses', 'high bandwidth', 'long distances', 'EMI', 'electromagnetic', 'expensive', 'fragile'],
    keywordsRu: ['свет', 'скорость', 'электромагнитным', 'стоимость', 'хрупкое'],
    model: {
      en: [
        '<b>Advantage:</b> fibre carries data as light pulses, giving very high bandwidth over long distances and immunity to electromagnetic interference (EMI) — ideal for a high-traffic backbone (1–2).',
        '<b>Limitation:</b> it is more expensive to install and the glass fibre is fragile / harder to splice and repair than copper (1).'
      ],
      ru: ['Преимущество — высокая скорость на больших расстояниях и отсутствие электромагнитных помех; ограничение — высокая стоимость монтажа и хрупкость/сложность ремонта.']
    }
  },
  {
    id: 'A2.2-Q5', topic: 'A2.2', marks: 6, command: 'Evaluate',
    title: { en: 'Wired vs wireless evaluation', ru: 'Проводное и беспроводное' },
    q: {
      en: 'Evaluate the use of wireless transmission versus twisted pair (UTP) for a modern library network.',
      ru: 'Оцените применение беспроводной передачи против витой пары (UTP) для современной библиотечной сети.'
    },
    keywords: ['mobility', 'interference', 'security', 'reliable', 'cabling', 'judgement', 'hybrid'],
    keywordsRu: ['мобильность', 'помех', 'безопасность', 'надёжна', 'кабель', 'вывод', 'гибрид'],
    model: {
      en: [
        '<b>Wireless — for:</b> high mobility, no cabling cost, easy to add devices (1–2).',
        '<b>Wireless — against:</b> prone to interference, variable speed, security risk (1).',
        '<b>UTP — for:</b> reliable, consistent speed, more secure (1).',
        '<b>UTP — against:</b> restricts mobility, requires cabling to every point (1).',
        '<b>Judgement:</b> a balanced solution — wireless for public/mobile users, wired UTP for fixed/critical machines (1).'
      ],
      ru: ['«Evaluate» (6 баллов) требует «за» и «против» обеих сторон и обоснованного вывода. Сильный ответ предлагает гибрид: Wi-Fi для посетителей, проводное — для стационарных машин.']
    }
  },

  // ============ A2.3 TOPOLOGIES, MODELS & SEGMENTATION ============
  {
    id: 'A2.3-Q1', topic: 'A2.3', marks: 4, command: 'Describe',
    title: { en: 'Network topologies', ru: 'Сетевые топологии' },
    q: {
      en: 'Describe the differences between Star and Mesh topologies in terms of reliability and cost.',
      ru: 'Опишите различия топологий «звезда» и «ячеистая» по надёжности и стоимости.'
    },
    keywords: ['single point of failure', 'central switch', 'redundant', 'no single point', 'cabling', 'expensive'],
    keywordsRu: ['единая точка отказа', 'центральный', 'резервные', 'дорого'],
    model: {
      en: [
        '<b>Star — reliability:</b> a single link failure isolates only one device, but the <b>central switch is a single point of failure</b> (1).',
        '<b>Star — cost:</b> relatively low; each device needs only one cable to the centre (1).',
        '<b>Mesh — reliability:</b> very high — redundant paths reroute around failures, with <b>no single point of failure</b> (1).',
        '<b>Mesh — cost:</b> high — many interconnections/cabling and hardware to install and scale (1).'
      ],
      ru: ['Сравните оба критерия для обеих топологий: звезда — дешевле, но центр = единая точка отказа; mesh — очень надёжна (резервные пути), но дорога.']
    }
  },
  {
    id: 'A2.3-Q1B', topic: 'A2.3', marks: 1, command: 'Identify',
    title: { en: 'Hub data collisions', ru: 'Коллизии данных' },
    q: {
      en: 'In older Star implementations using a Hub (instead of a Switch), what was the primary factor affecting transmission speed?',
      ru: 'Что в старых «звёздах» на хабе (вместо коммутатора) было главным фактором, влиявшим на скорость?'
    },
    keywords: ['broadcasts', 'every port', 'collisions', 'shared bandwidth'],
    keywordsRu: ['рассылает', 'коллизии', 'общая полоса'],
    model: {
      en: ['The hub <b>broadcasts</b> data to every port, causing frequent <b>data collisions</b> and shared bandwidth, which lowered throughput (a switch instead sends only to the destination MAC).'],
      ru: ['Хаб рассылает на все порты → коллизии и общая полоса → падение скорости. Коммутатор шлёт только адресату.']
    }
  },
  {
    id: 'A2.3-Q2', topic: 'A2.3', marks: 2, command: 'Identify',
    title: { en: 'Large-scale topologies', ru: 'Крупные топологии' },
    q: {
      en: 'College campuses rarely use a pure Star or pure Mesh topology. Identify the topology typically used and outline why.',
      ru: 'Кампусы редко используют чистую «звезду» или mesh. Назовите типичную топологию и кратко объясните почему.'
    },
    keywords: ['hybrid', 'scalability', 'isolate faults', 'balance'],
    keywordsRu: ['гибридная', 'масштабируемость', 'локализация'],
    model: {
      en: [
        'A <b>hybrid</b> topology (e.g. star-bus or star-mesh) (1).',
        'It combines the strengths of each — high scalability and the ability to isolate faults to one section, while balancing cost (1).'
      ],
      ru: ['Ответ — гибридная топология: сочетает плюсы (масштабируемость, локализация сбоев) и балансирует стоимость.']
    }
  },
  {
    id: 'A2.3-Q3', topic: 'A2.3', marks: 5, command: 'Compare and contrast',
    title: { en: 'Networking models', ru: 'Сетевые модели' },
    q: {
      en: 'Compare and contrast the Client-Server model with the Peer-to-Peer (P2P) model regarding scalability and management.',
      ru: 'Сравните (сходства и различия) модели «клиент-сервер» и P2P по масштабируемости и управлению.'
    },
    keywords: ['centralised', 'bottleneck', 'single point', 'decentralised', 'harder to secure', 'each peer', 'scales naturally'],
    keywordsRu: ['централизована', 'узкое место', 'децентрализована', 'каждый узел', 'масштабируется'],
    model: {
      en: [
        '<b>Both</b> are ways of organising how nodes share resources across a network (similarity) (1).',
        '<b>Client-Server — management:</b> centralised, so security, updates and backups are easier to administer (1).',
        '<b>Client-Server — scalability:</b> the central server is a bottleneck / single point of failure as load grows (1).',
        '<b>P2P — management:</b> decentralised, harder to secure and administer (1).',
        '<b>P2P — scalability:</b> scales naturally as each new peer contributes bandwidth/resources; no central bottleneck (1).'
      ],
      ru: ['«Compare and contrast» = и сходство, и различия. Клиент-сервер: проще управление, но сервер — узкое место. P2P: сложнее управлять, но масштабируется сам.']
    }
  },
  {
    id: 'A2.3-Q3B', topic: 'A2.3', marks: 1, command: 'Identify',
    title: { en: 'Real-world applications', ru: 'Где применяется' },
    q: {
      en: 'Which application relies almost exclusively on a Client-Server model?',
      ru: 'Какое приложение почти полностью опирается на модель «клиент-сервер»?'
    },
    keywords: ['web', 'email', 'banking', 'client-server'],
    keywordsRu: ['веб', 'почта', 'банкинг'],
    model: {
      en: ['Web browsing, email or online banking (client-server). By contrast, blockchain, file-sharing and some VoIP use P2P.'],
      ru: ['Веб, почта, онлайн-банкинг — клиент-сервер. Блокчейн, файлообмен, часть VoIP — P2P.']
    }
  },
  {
    id: 'A2.3-Q4', topic: 'A2.3', marks: 2, command: 'Identify',
    title: { en: 'Emerging technologies', ru: 'Новые технологии' },
    q: {
      en: 'Blockchain technology utilizes which network model?',
      ru: 'Какую сетевую модель использует технология блокчейн?'
    },
    keywords: ['peer-to-peer', 'P2P', 'decentralised', 'no single entity'],
    keywordsRu: ['P2P', 'децентрал', 'ни один'],
    model: {
      en: ['<b>Peer-to-Peer (P2P)</b> (1) — so that no single entity controls the transaction history/ledger; it is decentralised across all nodes (1).'],
      ru: ['Блокчейн = P2P: ни один участник не контролирует журнал транзакций, реестр распределён по всем узлам.']
    }
  },
  {
    id: 'A2.3-Q5', topic: 'A2.3', marks: 4, command: 'Explain',
    title: { en: 'Network segmentation', ru: 'Сегментация сети' },
    q: {
      en: 'Explain how VLANs improve security and performance.',
      ru: 'Объясните, как VLAN повышают безопасность и производительность.'
    },
    keywords: ['logically isolates', 'sensitive', 'broadcast domains', 'congestion'],
    keywordsRu: ['изоляция', 'широковещательных', 'заторов'],
    model: {
      en: [
        '<b>Security:</b> a VLAN logically isolates sensitive traffic (e.g. patient or finance records) from general/public access, even on shared switches (1–2).',
        '<b>Performance:</b> it splits one large network into smaller <b>broadcast domains</b>, reducing broadcast traffic and congestion (1–2).'
      ],
      ru: ['Два направления: безопасность — логическая изоляция чувствительных данных; производительность — меньшие широковещательные домены → меньше заторов.']
    }
  },
  {
    id: 'A2.3-Q5B', topic: 'A2.3', marks: 1, command: 'Identify',
    title: { en: 'Subnetting vs VLANs', ru: 'Подсети против VLAN' },
    q: {
      en: 'What method operates at Layer 3 to divide an IP address space?',
      ru: 'Какой метод работает на 3-м уровне для деления пространства IP-адресов?'
    },
    keywords: ['subnetting', 'Layer 3'],
    keywordsRu: ['подсети', '3', 'уровень'],
    model: {
      en: ['<b>Subnetting</b> (Layer 3). A VLAN, by contrast, provides logical separation at Layer 2.'],
      ru: ['Подсети (subnetting) — уровень 3; VLAN — логическое разделение на уровне 2.']
    }
  },
  {
    id: 'A2.3-Q6', topic: 'A2.3', marks: 3, command: 'Discuss',
    title: { en: 'Social & ethical impact', ru: 'Этические аспекты' },
    q: {
      en: 'Discuss the ethical implications of covert employee monitoring.',
      ru: 'Обсудите этические последствия скрытого мониторинга сотрудников.'
    },
    keywords: ['right to privacy', 'consent', 'transparency', 'trust', 'balanced'],
    keywordsRu: ['приватность', 'согласия', 'прозрачности', 'доверие'],
    model: {
      en: [
        'It creates a conflict between the employee\'s <b>right to privacy</b> and the employer\'s right to protect company assets/security (1).',
        'Monitoring done <b>without consent or transparency</b> can damage trust and workplace morale (1).',
        'A balanced view: monitoring may be justified for security if it is proportionate and disclosed, but covert surveillance is ethically problematic (1).'
      ],
      ru: ['«Discuss» = взвешенный обзор: приватность работника против права компании защищать активы; скрытость без согласия подрывает доверие; вывод — допустимо при прозрачности и соразмерности.']
    }
  },

  // ============ A2.1.4 NETWORK PROTOCOLS ============
  {
    id: 'A2.1.4-Q1', topic: 'A2.1.4', marks: 3, command: 'Distinguish',
    title: { en: 'TCP vs UDP mechanics', ru: 'Механика TCP/UDP' },
    q: {
      en: 'Distinguish between TCP and UDP in terms of reliability and data sequencing.',
      ru: 'Различите TCP и UDP по надёжности и упорядочиванию данных.'
    },
    keywords: ['connection-oriented', 're-orders', 'sequence', 'retransmitting', 'connectionless', 'no reliability', 'faster'],
    keywordsRu: ['соединения', 'порядок', 'повтор', 'без гарантий', 'быстрее'],
    model: {
      en: [
        '<b>TCP:</b> connection-oriented; guarantees reliability and <b>re-orders packets into the correct sequence</b>, retransmitting any that are lost (1–2).',
        '<b>UDP:</b> connectionless; <b>no reliability or sequencing guarantee</b>, but lower overhead makes it much faster for real-time data (1).'
      ],
      ru: ['TCP надёжен и упорядочивает пакеты (повтор потерянных); UDP без гарантий и без упорядочивания, зато быстрее для реального времени.']
    }
  },
  {
    id: 'A2.1.4-Q2', topic: 'A2.1.4', marks: 2, command: 'Identify',
    title: { en: 'Video conferencing choice', ru: 'Выбор для видеосвязи' },
    q: {
      en: 'Identify which protocol is most suitable for live video conferencing and justify your choice.',
      ru: 'Определите протокол для видеоконференций и обоснуйте выбор.'
    },
    keywords: ['UDP', 'speed', 'latency', 'real-time', 'no point retransmitting'],
    keywordsRu: ['UDP', 'скорость', 'задержку'],
    model: {
      en: [
        '<b>UDP</b> (1).',
        'For a live feed, speed matters more than perfection; there is no point retransmitting a lost packet that would arrive too late, so UDP minimises lag/latency (1).'
      ],
      ru: ['UDP: в прямом эфире важнее скорость; переотправлять опоздавший пакет бессмысленно, поэтому UDP уменьшает задержку.']
    }
  },
  {
    id: 'A2.1.4-Q3', topic: 'A2.1.4', marks: 3, command: 'Compare',
    title: { en: 'HTTP vs HTTPS', ru: 'HTTP против HTTPS' },
    q: {
      en: 'Compare the use of HTTP and HTTPS, specifically mentioning the role of encryption.',
      ru: 'Сравните HTTP и HTTPS, особенно роль шифрования.'
    },
    keywords: ['plaintext', 'intercepted', 'TLS', 'SSL', 'encryption', 'certificates'],
    keywordsRu: ['открытым', 'шифрование', 'TLS', 'сертификаты'],
    model: {
      en: [
        'Both transfer web resources between client and server (1).',
        '<b>HTTP</b> sends data in <b>plaintext</b>, so it can be intercepted/read (1).',
        '<b>HTTPS</b> adds <b>TLS/SSL encryption</b> (and certificates), protecting sensitive data such as passwords and card numbers in transit (1).'
      ],
      ru: ['Оба передают веб-данные; HTTP — открытым текстом (перехватываемо), HTTPS добавляет шифрование TLS/SSL и сертификаты, защищая пароли и платёжные данные.']
    }
  },
  {
    id: 'A2.1.4-Q4', topic: 'A2.1.4', marks: 3, command: 'Identify + describe',
    title: { en: 'IP assignment', ru: 'Назначение IP' },
    q: {
      en: 'A student\'s laptop is automatically assigned an IP address. Identify the protocol responsible and describe its function.',
      ru: 'Ноутбуку автоматически назначен IP. Назовите протокол и опишите его функцию.'
    },
    keywords: ['DHCP', 'lease', 'pool', 'conflicts', 'manual configuration'],
    keywordsRu: ['DHCP', 'пула', 'конфликтов'],
    model: {
      en: [
        '<b>DHCP</b> (Dynamic Host Configuration Protocol) (1).',
        'When a device joins the network it requests settings, and the DHCP server leases an IP from a pool (1), eliminating manual configuration and preventing IP address conflicts (1).'
      ],
      ru: ['DHCP: при подключении устройство запрашивает настройки, сервер выдаёт IP из пула — без ручной настройки и без конфликтов адресов.']
    }
  },
  {
    id: 'A2.1.4-Q5', topic: 'A2.1.4', marks: 4, command: 'Explain',
    title: { en: 'TCP & database integrity', ru: 'TCP и целостность БД' },
    q: {
      en: 'Explain how the connection-oriented nature of TCP contributes to data integrity during a database file transfer.',
      ru: 'Объясните, как ориентированность TCP на соединение обеспечивает целостность данных при передаче файла БД.'
    },
    keywords: ['acknowledgements', 'retransmitted', 're-ordered', 'sequence', 'integrity'],
    keywordsRu: ['подтверждения', 'переотправляются', 'порядок', 'целостность'],
    model: {
      en: [
        'TCP establishes a connection and uses <b>acknowledgements</b>: the receiver confirms each segment (1).',
        'Lost or corrupted segments are <b>retransmitted</b>, and segments are <b>re-ordered</b> into the correct sequence (1–2).',
        'For a database file, even one missing/mis-ordered byte could corrupt the structure, so TCP\'s guarantees are essential to integrity (1).'
      ],
      ru: ['TCP подтверждает каждый сегмент, переотправляет потерянные и восстанавливает порядок; для файла БД даже один потерянный байт ломает структуру, поэтому гарантии TCP критичны.']
    }
  },
  {
    id: 'A2.1.4-Q6', topic: 'A2.1.4', marks: 3, command: 'Discuss',
    title: { en: 'HTTPS & human rights', ru: 'HTTPS и права человека' },
    q: {
      en: 'Discuss the ethical importance of HTTPS in regions with limited freedom of speech.',
      ru: 'Обсудите этическую важность HTTPS в регионах с ограниченной свободой слова.'
    },
    keywords: ['encryption', 'surveillance', 'activists', 'privacy', 'free expression', 'human rights'],
    keywordsRu: ['шифрование', 'слежки', 'журналистов', 'приватности', 'свободы'],
    model: {
      en: [
        'HTTPS encryption hides the content of communications, protecting activists, journalists and ordinary users from surveillance (1).',
        'So encryption is not only for commerce — it is a safeguard for <b>privacy, free expression and human rights</b> (1).',
        'Balanced view: the same encryption can also shield illegal activity, creating tension with law enforcement (1).'
      ],
      ru: ['HTTPS скрывает содержание переписки, защищая активистов и журналистов; шифрование — гарантия приватности и свободы слова. Сбалансированно: то же шифрование может прикрывать и нарушения.']
    }
  },

  // ============ A2.1.5 MASTERY ============
  {
    id: 'A2.1.5-Q1', topic: 'A2.1.5', marks: 4, command: 'Evaluate',
    title: { en: 'Full mesh in critical systems', ru: 'Полный mesh в госсистемах' },
    q: {
      en: 'Evaluate the use of a Full Mesh topology in a mission-critical government department. Reference reliability and cost.',
      ru: 'Оцените применение полной mesh-топологии в критически важном госведомстве. Учтите надёжность и стоимость.'
    },
    keywords: ['maximum redundancy', 'no single point of failure', 'expensive', 'scale', 'judgement', 'justified'],
    keywordsRu: ['резервирования', 'нет единой точки отказа', 'дорого', 'оправдано'],
    model: {
      en: [
        '<b>Reliability (for):</b> in a full mesh every node connects to every other node, giving maximum redundancy and <b>no single point of failure</b> — vital for mission-critical operations (1–2).',
        '<b>Cost (against):</b> the number of links grows rapidly, making cabling and hardware <b>extremely expensive</b> and hard to scale (1).',
        '<b>Judgement:</b> justified here because the value of guaranteed availability outweighs the high cost (1).'
      ],
      ru: ['«Evaluate»: надёжность (полная сетка = максимум резервирования, нет единой точки отказа — критично для госслужбы) против стоимости (очень дорого); вывод — оправдано, т.к. доступность важнее цены.']
    }
  },

  // ============ A3.1 DATABASE FUNDAMENTALS ============
  {
    id: 'A3.1-Q1A', topic: 'A3.1', marks: 1, command: 'Define',
    title: { en: 'Defining databases', ru: 'Определение БД' },
    q: {
      en: 'Define the term database.',
      ru: 'Дайте определение термина «база данных».'
    },
    keywords: ['organised collection', 'stored', 'accessed electronically'],
    keywordsRu: ['организованная', 'коллекция', 'электронно'],
    model: {
      en: ['A database is an <b>organised collection of data</b>, stored and accessed electronically from a computer system.'],
      ru: ['Организованная коллекция данных, хранимая и доступная электронно. Кратко и точно (Define).']
    }
  },
  {
    id: 'A3.1-Q1B', topic: 'A3.1', marks: 2, command: 'Define',
    title: { en: 'Entities & tuples', ru: 'Сущности и кортежи' },
    q: {
      en: 'Define the terms entity and tuple in the context of a library database.',
      ru: 'Дайте определения «сущность» и «кортеж» в контексте библиотечной БД.'
    },
    keywords: ['real-world object', 'table', 'row', 'record', 'instance'],
    keywordsRu: ['объект', 'таблица', 'строка', 'запись'],
    model: {
      en: [
        '<b>Entity:</b> a real-world object/concept about which data is stored, represented as a table (e.g. Member or Book) (1).',
        '<b>Tuple:</b> a single row/record in a table — one instance of that entity (e.g. one specific member) (1).'
      ],
      ru: ['Сущность — объект, о котором хранят данные (таблица), напр. «Читатель». Кортеж — одна строка/запись (один конкретный читатель).']
    }
  },
  {
    id: 'A3.1-Q2A', topic: 'A3.1', marks: 2, command: 'Distinguish',
    title: { en: 'Key identification', ru: 'Идентификация ключей' },
    q: {
      en: 'Distinguish between a primary key and a foreign key.',
      ru: 'Различите первичный и внешний ключ.'
    },
    keywords: ['uniquely identifies', 'each record', 'refers to', 'primary key', 'link', 'relationship'],
    keywordsRu: ['однозначно', 'ссылается', 'связь'],
    model: {
      en: [
        '<b>Primary key:</b> a field that <b>uniquely identifies each record</b> in its table (1).',
        '<b>Foreign key:</b> a field in one table that <b>refers to the primary key</b> of another table to create a link/relationship (1).'
      ],
      ru: ['Первичный ключ однозначно идентифицирует запись в своей таблице; внешний ключ ссылается на первичный ключ другой таблицы, создавая связь.']
    }
  },
  {
    id: 'A3.1-Q2B', topic: 'A3.1', marks: 2, command: 'Explain',
    title: { en: 'Referential integrity', ru: 'Ссылочная целостность' },
    q: {
      en: 'Explain what is meant by referential integrity and why it is critical for library loans.',
      ru: 'Объясните, что такое ссылочная целостность и почему она важна для выдачи книг.'
    },
    keywords: ['foreign key', 'valid', 'existing', 'primary key', 'orphaned'],
    keywordsRu: ['внешний', 'существующий', 'первичный', 'несуществующего'],
    model: {
      en: [
        'Referential integrity is a set of rules ensuring every foreign key points to a valid, existing primary key, keeping relationships consistent (1).',
        'For loans it prevents recording a loan for a non-existent member or book, avoiding orphaned/invalid records (1).'
      ],
      ru: ['Ссылочная целостность — правила, по которым внешний ключ всегда указывает на существующий первичный ключ. Для выдачи: нельзя оформить заём на несуществующего читателя/книгу.']
    }
  },
  {
    id: 'A3.1-Q3', topic: 'A3.1', marks: 3, command: 'Outline',
    title: { en: 'Relationship types', ru: 'Типы связей' },
    q: {
      en: 'Outline the difference between a one-to-many and a many-to-many relationship.',
      ru: 'Опишите различие между связями «один-ко-многим» и «многие-ко-многим».'
    },
    keywords: ['one record', 'many', 'junction table', 'link table', 'resolved'],
    keywordsRu: ['одна', 'связан', 'связующую'],
    model: {
      en: [
        '<b>One-to-many (1:M):</b> one record in Table A relates to many records in Table B, but each B record relates to only one A (e.g. one author → many books) (1).',
        '<b>Many-to-many (M:N):</b> many A records relate to many B records (e.g. students ↔ courses) (1); this must be resolved using a <b>junction table</b> (1).'
      ],
      ru: ['1:M — одна запись A связана со многими B, но каждая B — с одной A. M:N — многие со многими; разрешается через связующую таблицу.']
    }
  },
  {
    id: 'A3.1-Q4', topic: 'A3.1', marks: 4, command: 'Discuss',
    title: { en: 'Relational limitations', ru: 'Ограничения реляционной БД' },
    q: {
      en: 'Discuss the limitations of using a relational database for a hospital storing diverse audio and X-ray files.',
      ru: 'Обсудите ограничения реляционной БД для больницы, хранящей разнородные аудио и рентген-снимки.'
    },
    keywords: ['rigid', 'schema', 'unstructured', 'object-relational mismatch', 'NoSQL', 'document'],
    keywordsRu: ['жёсткая', 'схема', 'неструктурированных', 'NoSQL'],
    model: {
      en: [
        '<b>Schema rigidity:</b> relational tables need predefined columns/types, which fit poorly with varied unstructured files like audio notes and images (1–2).',
        '<b>Object-relational mismatch:</b> complex objects (and OOP concepts such as inheritance) are hard to map into flat tables (1).',
        '<b>Implication:</b> a NoSQL/document or specialised store may handle such diverse media better (1).'
      ],
      ru: ['Жёсткая схема (заранее заданные столбцы) плохо подходит для неструктурированных файлов; сложно отображать сложные объекты в плоские таблицы. Вывод — лучше NoSQL/документная или специализированная БД.']
    }
  },

  // ============ A3.2 DATABASE DESIGN ============
  {
    id: 'A3.2-Q1B', topic: 'A3.2', marks: 3, command: 'Distinguish',
    title: { en: 'Conceptual vs physical', ru: 'Концептуальная и физическая' },
    q: {
      en: 'Distinguish between a conceptual schema and a physical schema.',
      ru: 'Различите концептуальную и физическую схемы.'
    },
    keywords: ['abstract', 'entities', 'relationships', 'data types', 'indices', 'storage', 'disk'],
    keywordsRu: ['абстрактная', 'сущности', 'типы', 'индексы', 'диске'],
    model: {
      en: [
        '<b>Conceptual schema:</b> the most abstract model — entities and the relationships between them, with no implementation detail (1–2).',
        '<b>Physical schema:</b> defines how data is actually stored — attributes with data types, keys, indices and file/storage structures on disk (1–2).'
      ],
      ru: ['Концептуальная — абстрактная модель: сущности и связи, без деталей. Физическая — как данные реально хранятся: типы, ключи, индексы, структуры на диске.']
    }
  },
  {
    id: 'A3.2-Q2B', topic: 'A3.2', marks: 3, command: 'Describe',
    title: { en: 'Resolving M:N', ru: 'Разрешение M:N' },
    q: {
      en: 'Describe how a many-to-many relationship (e.g. Vet to Pet) must be resolved in a relational database.',
      ru: 'Опишите, как связь «многие-ко-многим» (Ветеринар-Питомец) разрешается в реляционной БД.'
    },
    keywords: ['junction', 'link table', 'foreign keys', 'one-to-many'],
    keywordsRu: ['связующую', 'внешние', 'один-ко-многим'],
    model: {
      en: [
        'Introduce a third <b>junction (link) table</b> between the two entities (1).',
        'The junction table holds the primary keys of both as <b>foreign keys</b> (e.g. an Appointment table with VetID and PetID) (1).',
        'This breaks the M:N into two <b>one-to-many</b> relationships (1).'
      ],
      ru: ['Добавляем третью связующую таблицу; в ней — внешние ключи обеих сущностей (напр. «Приём» с VetID и PetID). Так M:N превращается в две связи 1:M.']
    }
  },
  {
    id: 'A3.2-Q3A', topic: 'A3.2', marks: 2, command: 'Explain',
    title: { en: 'First Normal Form (1NF)', ru: 'Первая нормальная форма' },
    q: {
      en: 'Explain what must be done to bring a database into First Normal Form (1NF).',
      ru: 'Объясните, что нужно для приведения БД к 1НФ.'
    },
    keywords: ['atomic', 'single value', 'repeating groups'],
    keywordsRu: ['атомарны', 'одно значение', 'повторяющиеся'],
    model: {
      en: [
        'All attribute values must be <b>atomic</b> — a single value per cell (1).',
        '<b>Repeating groups</b> must be removed (each row holds one record of a kind) (1).'
      ],
      ru: ['1НФ: все значения атомарны (одно значение в ячейке) и устранены повторяющиеся группы.']
    }
  },
  {
    id: 'A3.2-Q3B', topic: 'A3.2', marks: 3, command: 'Explain',
    title: { en: 'Third Normal Form (3NF)', ru: 'Третья нормальная форма' },
    q: {
      en: 'Explain the condition that must be met for a database to be in 3NF.',
      ru: 'Объясните условие нахождения БД в 3НФ.'
    },
    keywords: ['2NF', 'transitive dependency', 'non-key', 'primary key'],
    keywordsRu: ['2НФ', 'транзитивных', 'неключевой'],
    model: {
      en: [
        'The database must already be in <b>2NF</b> (1).',
        'and have <b>no transitive dependency</b> — no non-key attribute depends on another non-key attribute; every non-key attribute depends only on the primary key (1–2).'
      ],
      ru: ['3НФ: уже в 2НФ и нет транзитивных зависимостей — неключевые атрибуты зависят только от первичного ключа, а не друг от друга.']
    }
  },
  {
    id: 'A3.2-Q4', topic: 'A3.2', marks: 4, command: 'Evaluate',
    title: { en: 'Denormalization', ru: 'Денормализация' },
    q: {
      en: 'Evaluate the use of denormalization in a high-traffic social media database.',
      ru: 'Оцените применение денормализации в высоконагруженной БД соцсети.'
    },
    keywords: ['read performance', 'joins', 'storage', 'update anomalies', 'redundancy', 'judgement'],
    keywordsRu: ['чтения', 'join', 'место', 'аномалии', 'вывод'],
    model: {
      en: [
        '<b>For:</b> reintroducing redundancy avoids expensive joins, greatly improving <b>read performance</b> for huge read-heavy workloads (feeds, profiles) (1–2).',
        '<b>Against:</b> it costs extra storage and risks <b>update anomalies</b>/inconsistency, since duplicated data must be kept in sync on every write (1–2).',
        '<b>Judgement:</b> justified for read-dominated systems where speed outweighs the controlled redundancy (1).'
      ],
      ru: ['«Evaluate»: плюс — меньше join-ов, выше скорость чтения; минус — больше места и риск аномалий обновления. Вывод: оправдано при преобладании чтения.']
    }
  },
  {
    id: 'A3.2-Q5', topic: 'A3.2', marks: 3, command: 'Discuss',
    title: { en: 'Anomaly ethics', ru: 'Этика аномалий' },
    q: {
      en: 'Discuss the ethical impact of update anomalies in a medical database.',
      ru: 'Обсудите этическое влияние аномалий обновления в медицинской БД.'
    },
    keywords: ['inconsistent', 'conflicting', 'out-of-date', 'patient harm', 'data-protection'],
    keywordsRu: ['противоречивые', 'устаревшим', 'вреда', 'защите'],
    model: {
      en: [
        'Redundant data that is updated inconsistently leaves conflicting versions, so it is unclear which record is correct (1).',
        'In a medical context this could mean a clinician acting on out-of-date/incorrect data, risking patient harm and breaching data-protection law (1–2).'
      ],
      ru: ['Несогласованное обновление дублей оставляет противоречивые версии; в медицине врач может действовать по устаревшим данным — риск вреда пациенту и нарушения закона.']
    }
  },

  // ============ A3.3 DATABASE PROGRAMMING ============
  {
    id: 'A3.3-Q1', topic: 'A3.3', marks: 3, command: 'Outline',
    title: { en: 'DDL vs DML', ru: 'DDL и DML' },
    q: {
      en: 'Outline the difference between DDL and DML, including one command for each.',
      ru: 'Опишите различие DDL и DML и приведите по одной команде.'
    },
    keywords: ['Data Definition', 'CREATE', 'ALTER', 'DROP', 'Data Manipulation', 'SELECT', 'INSERT'],
    keywordsRu: ['структуру', 'CREATE', 'данные', 'SELECT'],
    model: {
      en: [
        '<b>DDL (Data Definition Language)</b> defines the database structure/schema — e.g. <code>CREATE</code> (also ALTER, DROP) (1–2).',
        '<b>DML (Data Manipulation Language)</b> handles the data within tables — e.g. <code>SELECT</code> (also INSERT, UPDATE, DELETE) (1).'
      ],
      ru: ['DDL задаёт структуру (напр. CREATE); DML работает с данными (напр. SELECT).']
    }
  },
  {
    id: 'A3.3-Q3', topic: 'A3.3', marks: 3, command: 'Explain',
    title: { en: 'The WHERE clause', ru: 'Условие WHERE' },
    q: {
      en: 'Explain the critical importance of the WHERE clause when executing an UPDATE statement.',
      ru: 'Объясните, почему условие WHERE критично при выполнении UPDATE.'
    },
    keywords: ['which rows', 'every row', 'overwriting', 'data-integrity'],
    keywordsRu: ['какие строки', 'все строки', 'целостности'],
    model: {
      en: [
        'The WHERE clause specifies <b>which rows</b> to change (1).',
        'Without it, UPDATE applies to <b>every row</b> in the table, overwriting all records — a serious data-integrity error (1–2).'
      ],
      ru: ['WHERE указывает, какие строки менять; без него UPDATE изменит все строки таблицы — грубая ошибка целостности.']
    }
  },
  {
    id: 'A3.3-Q4', topic: 'A3.3', marks: 3, command: 'Describe', hl: true,
    title: { en: 'Database Views (HL)', ru: 'Представления (HL)' },
    q: {
      en: 'Describe a Database View and state whether the data is physically stored as a separate table.',
      ru: 'Опишите представление (View) и укажите, хранятся ли данные отдельной таблицей.'
    },
    keywords: ['virtual table', 'stored SELECT', 'security', 'not physically stored', 'underlying'],
    keywordsRu: ['виртуальная', 'запроса', 'безопасность', 'не', 'базовых'],
    model: {
      en: [
        'A view is a <b>virtual table</b> produced by a stored SELECT query; it presents selected columns/rows, often to enhance security (1–2).',
        'The data is <b>not</b> physically stored separately — the view is generated from the underlying base tables each time it is queried (1).'
      ],
      ru: ['Представление — виртуальная таблица из сохранённого запроса; данные отдельно не хранятся — формируются из базовых таблиц при обращении.']
    }
  },
  {
    id: 'A3.3-Q5', topic: 'A3.3', marks: 5, command: 'Explain', hl: true,
    title: { en: 'Transactions & atomicity (HL)', ru: 'Транзакции и атомарность (HL)' },
    q: {
      en: 'Explain how Atomicity and the ROLLBACK command prevent money from "disappearing" during a failed bank transfer.',
      ru: 'Объясните, как атомарность и ROLLBACK не дают деньгам «исчезнуть» при сбое перевода.'
    },
    keywords: ['transaction', 'all-or-nothing', 'ROLLBACK', 'COMMIT', 'integrity'],
    keywordsRu: ['транзакция', 'всё или ничего', 'COMMIT', 'целостность'],
    model: {
      en: [
        'A transfer is one <b>transaction</b> of multiple steps (debit account A, credit account B) (1).',
        '<b>Atomicity</b> means the transaction is all-or-nothing — it either fully completes or has no effect (1–2).',
        'If a step fails (e.g. crash after the debit), <b>ROLLBACK</b> reverts the database to its state at the last COMMIT (1).',
        'So money is never debited from A without being credited to B — integrity is preserved (1).'
      ],
      ru: ['Перевод — одна транзакция из нескольких шагов (списать с A, зачислить B). Атомарность = «всё или ничего»; при сбое ROLLBACK возвращает БД к последнему COMMIT, поэтому деньги не спишутся без зачисления.']
    }
  },
  {
    id: 'A3.3-Q6', topic: 'A3.3', marks: 3, command: 'Discuss',
    title: { en: 'Limits of knowing (TOK)', ru: 'ТОК-вопрос' },
    q: {
      en: 'Discuss how the rigid structure of SQL databases might limit our \'way of knowing\' human experience.',
      ru: 'Обсудите, как жёсткая структура SQL-БД может ограничивать наше «познание» человеческого опыта.'
    },
    keywords: ['reductionist', 'fixed fields', 'nuance', 'context', 'incomplete', 'model'],
    keywordsRu: ['редукционист', 'поля', 'нюанс', 'неполно'],
    model: {
      en: [
        'Relational databases are <b>reductionist</b>: they force rich human experience into fixed fields and categories (1).',
        'Nuance, context and ambiguity that do not fit the schema are lost or distorted (1).',
        'So data-driven \'knowledge\' may be incomplete — a model of reality, not reality itself (1).'
      ],
      ru: ['ТОК-вопрос: реляционные БД редукционистичны — втискивают опыт в жёсткие поля и категории; нюанс и контекст, не вписавшиеся в схему, теряются, поэтому «знание» из данных неполно.']
    }
  },

  // ============ A3.3 SQL PRACTICAL ============
  {
    id: 'A3.3-SQL-Q1', topic: 'A3.3', marks: 4, command: 'Construct',
    title: { en: 'CREATE TABLE', ru: 'CREATE TABLE' },
    q: {
      en: 'Construct the SQL statement to create the PRODUCT table with ProductID as the Primary Key.',
      ru: 'Постройте SQL для создания таблицы PRODUCT с первичным ключом ProductID.'
    },
    keywords: ['CREATE TABLE', 'PRIMARY KEY', 'VARCHAR', 'DECIMAL'],
    keywordsRu: ['CREATE TABLE', 'PRIMARY KEY'],
    model: {
      en: [
        '<pre class="code">CREATE TABLE PRODUCT (\n    ProductID    VARCHAR(10) NOT NULL PRIMARY KEY,\n    ProductName  VARCHAR(50),\n    Category     VARCHAR(30),\n    Price        DECIMAL(8,2)\n);</pre>',
        '<i>Marks: CREATE TABLE; sensible data types (VARCHAR/DECIMAL); ProductID PRIMARY KEY; NOT NULL.</i>'
      ],
      ru: ['Нужны: CREATE TABLE, разумные типы (VARCHAR, DECIMAL), объявление ProductID как PRIMARY KEY и NOT NULL.']
    }
  },
  {
    id: 'A3.3-SQL-Q2', topic: 'A3.3', marks: 3, command: 'Construct',
    title: { en: 'UPDATE precision', ru: 'UPDATE точечно' },
    q: {
      en: 'Construct an SQL statement to update the Price of the product with ProductID = \'P105\' to 25.50.',
      ru: 'Постройте SQL для изменения цены товара ProductID=\'P105\' на 25.50.'
    },
    keywords: ['UPDATE', 'SET', 'WHERE', 'ProductID'],
    keywordsRu: ['UPDATE', 'SET', 'WHERE'],
    model: {
      en: ['<pre class="code">UPDATE PRODUCT\nSET Price = 25.50\nWHERE ProductID = \'P105\';</pre>'],
      ru: ['UPDATE … SET … WHERE ProductID=\'P105\'. Обязателен WHERE, иначе изменятся цены всех товаров.']
    }
  },
  {
    id: 'A3.3-SQL-Q3', topic: 'A3.3', marks: 4, command: 'Construct',
    title: { en: 'Multi-table JOIN', ru: 'Многотабличный JOIN' },
    q: {
      en: 'Construct an SQL query to retrieve ProductName and QuantitySold for all sales on \'2026-11-24\'.',
      ru: 'Постройте SQL: ProductName и QuantitySold по всем продажам за 2026-11-24.'
    },
    keywords: ['SELECT', 'JOIN', 'ON', 'WHERE', 'SaleDate'],
    keywordsRu: ['SELECT', 'JOIN', 'WHERE'],
    model: {
      en: ['<pre class="code">SELECT PRODUCT.ProductName, SALE.QuantitySold\nFROM PRODUCT\nJOIN SALE ON PRODUCT.ProductID = SALE.ProductID\nWHERE SALE.SaleDate = \'2026-11-24\';</pre>'],
      ru: ['Соединяем PRODUCT и SALE по общему ProductID, выбираем два столбца и фильтруем по дате в WHERE.']
    }
  },

  // ============ A3.4 ALT DATABASES (HL) ============
  {
    id: 'A3.4-Q1', topic: 'A3.4', marks: 4, command: 'Distinguish', hl: true,
    title: { en: 'Relational vs NoSQL (HL)', ru: 'Реляционная против NoSQL (HL)' },
    q: {
      en: 'Distinguish between a relational database and a NoSQL database in terms of data structure and scalability.',
      ru: 'Различите реляционную и NoSQL БД по структуре данных и масштабируемости.'
    },
    keywords: ['fixed schema', 'flexible', 'documents', 'unstructured', 'vertically', 'horizontally', 'cluster'],
    keywordsRu: ['жёсткая', 'гибкая', 'документы', 'вертикально', 'горизонтально'],
    model: {
      en: [
        '<b>Structure:</b> relational uses a fixed, predefined schema of related tables; NoSQL uses a <b>flexible schema</b> (e.g. documents) suited to unstructured/varied data (1–2).',
        '<b>Scalability:</b> relational typically scales <b>vertically</b> (a more powerful server); NoSQL scales <b>horizontally</b> by adding more servers to a cluster, handling large volumes/high loads (1–2).'
      ],
      ru: ['Структура: реляционная — жёсткая схема таблиц; NoSQL — гибкая схема (документы) для неструктурированных данных. Масштабирование: реляционная — вертикально, NoSQL — горизонтально (добавляем серверы).']
    }
  },
  {
    id: 'A3.4-Q2', topic: 'A3.4', marks: 3, command: 'Explain', hl: true,
    title: { en: 'The data warehouse (HL)', ru: 'Хранилище данных (HL)' },
    q: {
      en: 'Explain why a data warehouse is described as \'non-volatile\' compared to a standard transactional database.',
      ru: 'Объясните, почему хранилище данных называют «неизменяемым» в сравнении с транзакционной БД.'
    },
    keywords: ['not modified', 'historical', 'analysis', 'OLTP', 'constantly updated'],
    keywordsRu: ['не', 'изменяют', 'историю', 'обновляется'],
    model: {
      en: [
        '\'Non-volatile\' means data, once loaded, is <b>not modified or deleted</b> — it is read for analysis but not updated (1).',
        'This preserves a stable historical record for long-term trend analysis (1).',
        'By contrast, a transactional (OLTP) database is constantly updated by day-to-day operations (1).'
      ],
      ru: ['«Неизменяемость»: загруженные данные не правят и не удаляют — только читают для анализа, что сохраняет историю для трендов. Транзакционная БД, наоборот, постоянно обновляется операциями.']
    }
  },
  {
    id: 'A3.4-Q3', topic: 'A3.4', marks: 3, command: 'Outline', hl: true,
    title: { en: 'The ETL process (HL)', ru: 'Процесс ETL (HL)' },
    q: {
      en: 'Outline the three stages of the ETL process used to populate a data warehouse.',
      ru: 'Опишите три стадии процесса ETL для наполнения хранилища.'
    },
    keywords: ['Extract', 'Transform', 'Load', 'sources', 'standardise', 'warehouse'],
    keywordsRu: ['Extract', 'Transform', 'Load', 'извлечь', 'очистить', 'загрузить'],
    model: {
      en: [
        '<b>Extract</b> — pull data from multiple/disparate source systems (1).',
        '<b>Transform</b> — clean, standardise and integrate it into a consistent format (1).',
        '<b>Load</b> — write the prepared data into the data warehouse (1).'
      ],
      ru: ['Extract — извлечь из разных источников; Transform — очистить и привести к единому формату; Load — загрузить в хранилище.']
    }
  },
  {
    id: 'A3.4-Q4', topic: 'A3.4', marks: 4, command: 'Distinguish', hl: true,
    title: { en: 'Data Mining vs OLAP (HL)', ru: 'Data Mining vs OLAP (HL)' },
    q: {
      en: 'Distinguish between OLAP and Data Mining in the context of business intelligence.',
      ru: 'Различите OLAP и Data Mining в контексте бизнес-аналитики.'
    },
    keywords: ['multidimensional', 'cubes', 'what happened', 'patterns', 'predict', 'why', 'what will happen'],
    keywordsRu: ['многомерный', 'кубы', 'что произошло', 'закономерности', 'прогноз'],
    model: {
      en: [
        '<b>OLAP:</b> uses multidimensional analysis (\'cubes\') to explore aggregated data and answer <b>\'what happened\'</b> (e.g. sales by region/quarter) (1–2).',
        '<b>Data mining:</b> uses statistical/ML algorithms to find hidden patterns and predict, answering <b>\'why it happened\'</b> and <b>\'what will happen\'</b> (1–2).'
      ],
      ru: ['OLAP — многомерный анализ агрегатов («кубы»), отвечает «что произошло». Data mining — алгоритмы ищут закономерности и прогнозируют — «почему» и «что будет».']
    }
  },
  {
    id: 'A3.4-Q5', topic: 'A3.4', marks: 4, command: 'Evaluate', hl: true,
    title: { en: 'Distributed databases (HL)', ru: 'Распределённые БД (HL)' },
    q: {
      en: 'Evaluate the use of a distributed database for a global corporation, considering both performance and consistency.',
      ru: 'Оцените распределённую БД для глобальной корпорации с учётом производительности и согласованности.'
    },
    keywords: ['multiple sites', 'latency', 'availability', 'synchronised', 'consistency', 'judgement'],
    keywordsRu: ['площадках', 'задержка', 'доступность', 'согласованность', 'вывод'],
    model: {
      en: [
        '<b>Performance (for):</b> data is stored across multiple sites, so users access a nearby copy with lower latency, and availability improves (no single point of failure) (1–2).',
        '<b>Consistency (against):</b> keeping replicas synchronised is complex; updates may temporarily conflict, risking inconsistency (1–2).',
        '<b>Judgement:</b> worthwhile for a global firm if the latency/availability gains justify the synchronization overhead (1).'
      ],
      ru: ['Производительность (плюс): данные на нескольких площадках → низкая задержка, выше доступность. Согласованность (минус): сложно синхронизировать реплики, риск расхождений. Вывод: оправдано, если выигрыш в скорости/доступности перевешивает.']
    }
  },

  // ============ A4.1 ML FUNDAMENTALS ============
  {
    id: 'A4.1-Q1', topic: 'A4.1', marks: 3, command: 'Distinguish',
    title: { en: 'AI hierarchy', ru: 'Иерархия ИИ' },
    q: {
      en: 'Distinguish between Artificial Intelligence, Machine Learning, and Deep Learning.',
      ru: 'Различите искусственный интеллект, машинное обучение и глубокое обучение.'
    },
    keywords: ['imitating', 'subset', 'data', 'algorithms', 'neural networks', 'layers'],
    keywordsRu: ['имитируют', 'подмножество', 'данных', 'нейросет'],
    model: {
      en: [
        '<b>AI</b> — the broad concept of machines imitating human intelligence (1).',
        '<b>ML</b> — a subset of AI that uses data/algorithms to improve at a task without being explicitly programmed (1).',
        '<b>Deep Learning</b> — a subset of ML using multi-layered neural networks to model complex patterns (1).'
      ],
      ru: ['ИИ — общее понятие (машины имитируют интеллект); ML — подмножество, учится на данных без явного программирования; DL — подмножество ML на многослойных нейросетях. (ИИ ⊃ ML ⊃ DL.)']
    }
  },
  {
    id: 'A4.1-Q2A', topic: 'A4.1', marks: 2, command: 'Distinguish',
    title: { en: 'Regression vs classification', ru: 'Регрессия и классификация' },
    q: {
      en: 'Distinguish between Regression and Classification tasks in supervised learning.',
      ru: 'Различите задачи регрессии и классификации в обучении с учителем.'
    },
    keywords: ['continuous', 'numerical', 'discrete', 'label', 'category'],
    keywordsRu: ['непрерывное', 'дискретная', 'категория'],
    model: {
      en: [
        '<b>Regression:</b> predicts a <b>continuous</b> numerical value (e.g. house price) (1).',
        '<b>Classification:</b> predicts a <b>discrete</b> label/category (e.g. spam vs not-spam) (1).'
      ],
      ru: ['Регрессия — непрерывное число (цена дома); классификация — дискретная категория (спам/не спам).']
    }
  },
  {
    id: 'A4.1-Q3', topic: 'A4.1', marks: 3, command: 'Identify',
    title: { en: 'Email filtering', ru: 'Фильтрация писем' },
    q: {
      en: 'Identify the type of machine learning used to sort Spam vs Primary emails and explain how it learns.',
      ru: 'Определите тип ML для сортировки «спам/обычное» и объясните, как он обучается.'
    },
    keywords: ['supervised', 'classification', 'labelled', 'patterns', 'features'],
    keywordsRu: ['с учителем', 'классификация', 'размеченном', 'признаки'],
    model: {
      en: [
        'It is <b>supervised learning</b> (specifically classification) (1).',
        'The algorithm is trained on a <b>labelled</b> dataset of emails marked spam or legitimate (1).',
        'It learns the patterns/features associated with each class and applies them to classify new emails (1).'
      ],
      ru: ['Обучение с учителем (классификация): модель учится на размеченном наборе писем (спам/не спам), выделяет признаки каждого класса и применяет к новым письмам.']
    }
  },
  {
    id: 'A4.1-Q4', topic: 'A4.1', marks: 3, command: 'Outline',
    title: { en: 'Robotic training', ru: 'Обучение робота' },
    q: {
      en: 'Outline how Reinforcement Learning can train a robotic arm to pick up fragile objects.',
      ru: 'Опишите, как обучение с подкреплением учит роборуку поднимать хрупкие объекты.'
    },
    keywords: ['agent', 'trial and error', 'reward', 'penalty', 'cumulative'],
    keywordsRu: ['агент', 'проб и ошибок', 'награда', 'штраф', 'суммарную'],
    model: {
      en: [
        'The arm is an <b>agent</b> that learns by trial and error within its environment (1).',
        'It receives a <b>reward</b> for a successful, gentle pickup and a <b>penalty</b> for dropping or crushing an object (1).',
        'Over many attempts it adjusts its actions to maximise cumulative reward, learning the optimal grip (1).'
      ],
      ru: ['Рука — агент, учится методом проб и ошибок: награда за удачный аккуратный захват, штраф за падение/раздавливание; со временем оптимизирует действия ради максимальной суммарной награды.']
    }
  },
  {
    id: 'A4.1-Q5', topic: 'A4.1', marks: 3, command: 'Outline',
    title: { en: 'High-frequency trading', ru: 'Высокочастотный трейдинг' },
    q: {
      en: 'A firm needs a system for static mathematical operations where microseconds matter. Outline whether an ASIC or FPGA is more appropriate and why.',
      ru: 'Фирме нужна система для статичных мат. операций, где важны микросекунды. ASIC или FPGA — что уместнее и почему?'
    },
    keywords: ['ASIC', 'custom-designed', 'fixed task', 'highest speed', 'static', 'inflexibility'],
    keywordsRu: ['ASIC', 'фиксированную', 'скорости', 'статичны'],
    model: {
      en: [
        'An <b>ASIC</b> is more appropriate (1).',
        'It is custom-designed for one fixed task, giving the highest speed and efficiency (1).',
        'Since the operations are static (unchanging), the inflexibility of an ASIC is not a drawback, and its raw speed is critical for microsecond-sensitive high-frequency trading (1).'
      ],
      ru: ['ASIC: заказан под одну фиксированную задачу → максимум скорости/эффективности. Так как операции статичны, негибкость ASIC не мешает, а скорость критична для микросекундного трейдинга.']
    }
  },
  {
    id: 'A4.1-Q6', topic: 'A4.1', marks: 3, command: 'Discuss',
    title: { en: 'Metadata & privacy', ru: 'Метаданные и приватность' },
    q: {
      en: 'How can unsupervised learning identify a user\'s social group even if messages are encrypted? Discuss the privacy implication.',
      ru: 'Как обучение без учителя выявляет социальную группу пользователя при шифровании сообщений? Обсудите последствие для приватности.'
    },
    keywords: ['clustering', 'metadata', 'who contacts whom', 'encryption', 'patterns', 'compromised'],
    keywordsRu: ['кластеризация', 'метаданным', 'паттерны', 'профилирует'],
    model: {
      en: [
        'Unsupervised <b>clustering</b> groups users by <b>metadata</b> patterns — who contacts whom, when and how often — without reading the content (1).',
        'So encryption protects message content but not these patterns (1).',
        '<b>Implication:</b> privacy can still be compromised, as social relationships and behaviour are profiled despite encryption (1).'
      ],
      ru: ['Кластеризация группирует пользователей по метаданным (кто, с кем, когда общается), не читая содержимое. Шифрование защищает текст, но не паттерны связей. Вывод: приватность всё равно под угрозой — профилируется поведение.']
    }
  },

  // ============ A4.2 DATA PREPROCESSING (HL) ============
  {
    id: 'A4.2-Q1A', topic: 'A4.2', marks: 1, command: 'Define', hl: true,
    title: { en: 'Defining outliers (HL)', ru: 'Определение выброса (HL)' },
    q: {
      en: 'Define the term outlier in the context of a dataset.',
      ru: 'Дайте определение «выброс» (outlier) в наборе данных.'
    },
    keywords: ['deviates significantly', 'rest', 'observations'],
    keywordsRu: ['отклоняющаяся', 'остальных'],
    model: {
      en: ['An outlier is a data point that <b>deviates significantly</b> from the rest of the observations in the dataset.'],
      ru: ['Выброс — точка данных, значительно отклоняющаяся от остальных наблюдений.']
    }
  },
  {
    id: 'A4.2-Q1B', topic: 'A4.2', marks: 2, command: 'Describe', hl: true,
    title: { en: 'Detecting outliers (HL)', ru: 'Обнаружение выбросов (HL)' },
    q: {
      en: 'Describe one statistical method to detect outliers in heart-rate data.',
      ru: 'Опишите один статистический метод обнаружения выбросов в данных пульса.'
    },
    keywords: ['Z-score', 'standard deviations', 'IQR', 'interquartile', 'Q1', 'Q3'],
    keywordsRu: ['Z-оценка', 'стандартных', 'IQR', 'межквартильного'],
    model: {
      en: [
        '<b>Z-score:</b> flag values lying beyond about 3 standard deviations from the mean (1–2).',
        '<b>or IQR method:</b> flag values outside 1.5 × the interquartile range below Q1 or above Q3 (1–2).'
      ],
      ru: ['Z-оценка: значения дальше ~3 стандартных отклонений от среднего. Либо метод IQR: значения за пределами 1,5× межквартильного размаха ниже Q1 или выше Q3.']
    }
  },
  {
    id: 'A4.2-Q2A', topic: 'A4.2', marks: 2, command: 'Describe', hl: true,
    title: { en: 'Feature selection (HL)', ru: 'Отбор признаков (HL)' },
    q: {
      en: 'Describe the role of feature selection in improving model performance.',
      ru: 'Опишите роль отбора признаков в улучшении модели.'
    },
    keywords: ['irrelevant', 'redundant', 'faster', 'noise', 'accurate'],
    keywordsRu: ['нерелевантные', 'избыточные', 'быстрее', 'шум'],
    model: {
      en: [
        'It removes <b>irrelevant or redundant</b> input variables (1).',
        'so the model trains faster, avoids learning noise, and makes more accurate predictions with less computational overhead (1).'
      ],
      ru: ['Удаляет нерелевантные/избыточные признаки, поэтому модель обучается быстрее, не учит шум и точнее прогнозирует при меньших затратах.']
    }
  },
  {
    id: 'A4.2-Q2B', topic: 'A4.2', marks: 3, command: 'Distinguish', hl: true,
    title: { en: 'Filter vs wrapper (HL)', ru: 'Filter vs wrapper (HL)' },
    q: {
      en: 'Distinguish between filter methods and wrapper methods.',
      ru: 'Различите фильтрующие и обёрточные методы отбора признаков.'
    },
    keywords: ['statistical tests', 'independently', 'fast', 'training the model', 'accurate', 'expensive'],
    keywordsRu: ['статистически', 'не зависят', 'обучая', 'точнее'],
    model: {
      en: [
        '<b>Filter methods:</b> evaluate features using statistical tests <b>independently of the model</b> — fast and cheap (1–2).',
        '<b>Wrapper methods:</b> evaluate subsets of features by actually <b>training the model</b> and comparing its performance — more accurate but computationally expensive (1–2).'
      ],
      ru: ['Фильтрующие — оценивают признаки статистически, не зависят от модели (быстро). Обёрточные — проверяют подмножества, реально обучая модель (точнее, но дорого).']
    }
  },
  {
    id: 'A4.2-Q3', topic: 'A4.2', marks: 3, command: 'Outline', hl: true,
    title: { en: 'Reducing complexity (HL)', ru: 'Снижение сложности (HL)' },
    q: {
      en: 'Outline the importance of dimensionality reduction when dealing with extensive survey data.',
      ru: 'Опишите важность снижения размерности при работе с обширными данными опросов.'
    },
    keywords: ['fewer variables', 'simplifying', 'speeding up', 'overfitting', 'curse of dimensionality'],
    keywordsRu: ['меньше', 'упрощает', 'ускоряет', 'переобучение'],
    model: {
      en: [
        'It reduces the number of variables/features under consideration (1).',
        'simplifying the model and speeding up training/processing (1).',
        'while retaining the important trends and reducing overfitting from too many dimensions (1).'
      ],
      ru: ['Снижает число переменных → упрощает модель и ускоряет обработку, сохраняя важные тренды и уменьшая переобучение из-за избытка измерений.']
    }
  },
  {
    id: 'A4.2-Q4', topic: 'A4.2', marks: 3, command: 'Describe', hl: true,
    title: { en: 'Raw data (HL)', ru: 'Сырые данные (HL)' },
    q: {
      en: 'Describe the implications of using raw data without cleaning it first.',
      ru: 'Опишите последствия использования «сырых» данных без очистки.'
    },
    keywords: ['errors', 'missing', 'duplicates', 'noise', 'garbage in, garbage out', 'unreliable'],
    keywordsRu: ['ошибки', 'пропуски', 'дубли', 'шум', 'мусор'],
    model: {
      en: [
        'Raw data contains errors, missing values, duplicates and noise (1).',
        'The model would learn these inaccuracies (1).',
        'leading to unreliable, poor-quality predictions — \'garbage in, garbage out\' (1).'
      ],
      ru: ['Сырые данные содержат ошибки, пропуски, дубли и шум; модель выучит эти неточности → ненадёжные прогнозы низкого качества («мусор на входе — мусор на выходе»).']
    }
  },

  // ============ A4.3 ML APPROACHES (HL) ============
  {
    id: 'A4.3-Q1A', topic: 'A4.3', marks: 3, command: 'Explain', hl: true,
    title: { en: 'Linear regression (HL)', ru: 'Линейная регрессия (HL)' },
    q: {
      en: 'Explain how linear regression is used to predict continuous outcomes like house prices.',
      ru: 'Объясните, как линейная регрессия предсказывает непрерывные величины (цены домов).'
    },
    keywords: ['dependent variable', 'independent', 'line of best fit', 'minimises', 'error', 'predict'],
    keywordsRu: ['зависимая', 'независим', 'наилучшего', 'минимум', 'ошибки'],
    model: {
      en: [
        'It models the relationship between a dependent variable (price) and independent variables (size, location…) (1).',
        'by fitting a <b>line of best fit</b> that minimises the error between predicted and actual values (1).',
        'New inputs are then plugged into the equation to predict a continuous price (1).'
      ],
      ru: ['Моделирует связь цены с признаками (площадь, район), подбирая линию наилучшего соответствия (минимум ошибки), и по уравнению предсказывает непрерывную цену.']
    }
  },
  {
    id: 'A4.3-Q2A', topic: 'A4.3', marks: 3, command: 'Explain', hl: true,
    title: { en: 'Hyperparameter tuning (HL)', ru: 'Гиперпараметры (HL)' },
    q: {
      en: 'Explain the role of hyperparameter tuning when evaluating supervised algorithms.',
      ru: 'Объясните роль настройки гиперпараметров при оценке алгоритмов с учителем.'
    },
    keywords: ['before training', 'learning rate', 'cannot learn', 'best performance', 'robust'],
    keywordsRu: ['до обучения', 'не выводят', 'лучшие', 'устойчивая'],
    model: {
      en: [
        'Hyperparameters are settings fixed <b>before</b> training (e.g. learning rate, k) that the model cannot learn from data (1).',
        'Tuning searches for the values that give the best performance (1).',
        'leading to a more accurate, efficient and robust model when evaluated (1).'
      ],
      ru: ['Гиперпараметры задаются до обучения (скорость обучения, k) и не выводятся из данных; настройка ищет лучшие значения → более точная, эффективная и устойчивая модель.']
    }
  },
  {
    id: 'A4.3-Q3A', topic: 'A4.3', marks: 2, command: 'Describe', hl: true,
    title: { en: 'Clustering techniques (HL)', ru: 'Кластеризация (HL)' },
    q: {
      en: 'Describe how clustering groups data based on similarities without labels.',
      ru: 'Опишите, как кластеризация группирует данные по сходству без меток.'
    },
    keywords: ['unsupervised', 'no labels', 'similarity', 'distance', 'centroid'],
    keywordsRu: ['без учителя', 'без меток', 'сходству', 'центроиду'],
    model: {
      en: [
        'Clustering is <b>unsupervised</b>: it uses no labelled outputs (1).',
        'It groups data points by feature similarity, typically by spatial distance, so similar points fall in the same cluster (e.g. K-means assigns points to the nearest centroid) (1).'
      ],
      ru: ['Кластеризация — без учителя (нет меток): группирует точки по сходству признаков, обычно по расстоянию (K-means относит точку к ближайшему центроиду).']
    }
  },
  {
    id: 'A4.3-Q4B', topic: 'A4.3', marks: 3, command: 'Describe', hl: true,
    title: { en: 'CNN architecture (HL)', ru: 'Архитектура CNN (HL)' },
    q: {
      en: 'Describe how Convolutional Neural Networks (CNNs) process grid-like data like pixels.',
      ru: 'Опишите, как свёрточные нейросети (CNN) обрабатывают данные-сетку (пиксели).'
    },
    keywords: ['convolutional layers', 'filters', 'edges', 'pooling', 'downsample', 'spatial hierarchies'],
    keywordsRu: ['свёрточные', 'фильтры', 'грани', 'пулинга'],
    model: {
      en: [
        'CNNs apply <b>convolutional layers</b> (learnable filters) that slide across the image to detect features such as edges (1).',
        '<b>Pooling layers</b> downsample to reduce size and keep key features (1).',
        'Stacking these layers lets the network learn <b>spatial hierarchies</b> — from simple edges to complex shapes (1).'
      ],
      ru: ['CNN применяет свёрточные слои (фильтры), скользящие по изображению и выделяющие признаки (грани); слои пулинга уменьшают размер, сохраняя важное; стек слоёв учит пространственные иерархии — от граней к сложным формам.']
    }
  },
  {
    id: 'A4.3-Q5A', topic: 'A4.3', marks: 3, command: 'Explain', hl: true,
    title: { en: 'Reinforcement learning (HL)', ru: 'Обучение с подкреплением (HL)' },
    q: {
      en: 'Explain how an agent learns in reinforcement learning.',
      ru: 'Объясните, как агент обучается при обучении с подкреплением.'
    },
    keywords: ['environment', 'actions', 'rewards', 'penalties', 'maximise cumulative', 'exploration', 'exploitation'],
    keywordsRu: ['средой', 'награды', 'штрафы', 'максимизируя', 'исследования'],
    model: {
      en: [
        'The agent interacts with an <b>environment</b>, taking actions and observing the resulting state (1).',
        'It receives <b>rewards</b> for good actions and <b>penalties</b> for bad ones (1).',
        'Over time it adjusts its policy to <b>maximise cumulative reward</b>, balancing exploration and exploitation (1).'
      ],
      ru: ['Агент взаимодействует со средой, совершает действия и видит результат; получает награды/штрафы и со временем меняет стратегию, максимизируя суммарную награду (баланс исследования и эксплуатации).']
    }
  },
  {
    id: 'A4.3-Q5B', topic: 'A4.3', marks: 2, command: 'Outline', hl: true,
    title: { en: 'Genetic algorithms (HL)', ru: 'Генетические алгоритмы (HL)' },
    q: {
      en: 'Outline the concept of Genetic Algorithms.',
      ru: 'Опишите концепцию генетических алгоритмов.'
    },
    keywords: ['natural selection', 'selection', 'crossover', 'mutation', 'generations'],
    keywordsRu: ['отбора', 'селекция', 'скрещивание', 'мутации', 'поколения'],
    model: {
      en: [
        'They are optimisation/search heuristics inspired by <b>natural selection</b> (1).',
        'A population of candidate solutions evolves over generations through <b>selection, crossover and mutation</b> to find an optimal solution (1).'
      ],
      ru: ['Эвристики оптимизации по принципу естественного отбора: популяция решений эволюционирует через селекцию, скрещивание и мутацию к оптимальному решению.']
    }
  },

  // ============ A4.4 ETHICS & NLP ============
  {
    id: 'A4.4-Q1B', topic: 'A4.4', marks: 3, command: 'Explain',
    title: { en: 'Origin of bias', ru: 'Происхождение предвзятости' },
    q: {
      en: 'Explain how algorithmic bias can occur in an automated mortgage-lending system.',
      ru: 'Объясните, как возникает алгоритмическая предвзятость в автоматической ипотечной системе.'
    },
    keywords: ['historical', 'training data', 'prejudice', 'unrepresentative', 'reproduces', 'discriminatory'],
    keywordsRu: ['историческими', 'предубеждения', 'недопредставлены', 'наследует'],
    model: {
      en: [
        'The model is trained on <b>historical lending data</b> (1).',
        'If that data reflects past human prejudice or is unrepresentative of some groups (1).',
        'the system learns and reproduces the bias, unfairly rejecting applicants from those groups (1).'
      ],
      ru: ['Модель обучается на исторических данных о кредитах; если в них прошлые предубеждения или группы недопредставлены, система наследует смещение и несправедливо отказывает таким заявителям.']
    }
  },
  {
    id: 'A4.4-Q2', topic: 'A4.4', marks: 4, command: 'Discuss',
    title: { en: 'Public surveillance', ru: 'Слежка в общественных местах' },
    q: {
      en: 'Discuss the ethical implications of using machine learning for facial recognition in public spaces.',
      ru: 'Обсудите этические последствия применения ML для распознавания лиц в общественных местах.'
    },
    keywords: ['consent', 'chilling effect', 'misidentification', 'false positives', 'safety', 'balance'],
    keywordsRu: ['согласия', 'сдерживающий', 'ошибочной', 'безопасность', 'баланс'],
    model: {
      en: [
        '<b>Against:</b> individuals are identified without consent; mass surveillance can create a \'chilling effect\' on free movement and expression (1–2).',
        'Risk of misidentification (false positives), which can fall disproportionately on some groups due to bias (1).',
        '<b>For:</b> it can improve public safety and help find missing/wanted persons (1).',
        '<b>Balance:</b> benefits must be weighed against privacy rights and the potential for abuse (1).'
      ],
      ru: ['«Discuss» = взвешенно. Против: нет согласия, массовая слежка, «сдерживающий эффект» на свободу; риск ошибочной идентификации (особенно из-за предвзятости). За: безопасность, поиск людей. Вывод: баланс пользы и права на приватность.']
    }
  },
  {
    id: 'A4.4-Q3A', topic: 'A4.4', marks: 1, command: 'Define',
    title: { en: 'Defining NLP', ru: 'Определение NLP' },
    q: {
      en: 'Define the term Natural Language Processing (NLP).',
      ru: 'Дайте определение «обработка естественного языка» (NLP).'
    },
    keywords: ['branch of AI', 'understand', 'process', 'human language'],
    keywordsRu: ['раздел', 'ИИ', 'понимать', 'язык'],
    model: {
      en: ['NLP is a branch of AI that enables machines to <b>understand and process human language</b> (text and speech).'],
      ru: ['NLP — раздел ИИ, позволяющий машинам понимать и обрабатывать человеческий язык (текст и речь).']
    }
  },
  {
    id: 'A4.4-Q3C', topic: 'A4.4', marks: 3, command: 'Explain',
    title: { en: 'Sarcasm & ambiguity', ru: 'Сарказм и неоднозначность' },
    q: {
      en: 'Explain the importance of handling sarcasm when detecting cyberbullying.',
      ru: 'Объясните важность учёта сарказма при выявлении кибербуллинга.'
    },
    keywords: ['reverses', 'literal meaning', 'context', 'tone', 'false positive', 'false negative'],
    keywordsRu: ['переворачивает', 'контекст', 'тон', 'ложноположительный', 'ложноотрицательный'],
    model: {
      en: [
        'Sarcasm reverses the literal meaning of words, so surface analysis misjudges intent (1).',
        'The NLP model must use <b>context</b> to interpret tone (1).',
        'Otherwise it may misclassify ironic/joking language as genuine bullying (a false positive) or miss disguised abuse (a false negative) (1).'
      ],
      ru: ['Сарказм переворачивает буквальный смысл; модель должна учитывать контекст/тон, иначе примет иронию за травлю (ложноположительный) или пропустит скрытую агрессию (ложноотрицательный).']
    }
  },
  {
    id: 'A4.4-Q4A', topic: 'A4.4', marks: 2, command: 'Describe',
    title: { en: 'False positives', ru: 'Ложноположительные' },
    q: {
      en: 'Describe the real-world consequence of a False Positive in a bullying-detection system.',
      ru: 'Опишите реальное последствие ложноположительного срабатывания в системе выявления травли.'
    },
    keywords: ['harmless', 'wrongly', 'warned', 'censored', 'trust'],
    keywordsRu: ['безобидное', 'невиновного', 'предупреждают', 'доверие'],
    model: {
      en: [
        'A false positive flags a harmless message as bullying (1).',
        'so an innocent user may be wrongly warned, censored or punished, undermining trust in the system (1).'
      ],
      ru: ['Ложноположительный помечает безобидное сообщение как травлю → невиновного пользователя ошибочно предупреждают/наказывают, подрывая доверие к системе.']
    }
  },
  {
    id: 'A4.4-Q4B', topic: 'A4.4', marks: 3, command: 'Describe',
    title: { en: 'False negatives', ru: 'Ложноотрицательные' },
    q: {
      en: 'Describe the consequence of a False Negative in a natural-disaster prediction model.',
      ru: 'Опишите последствие ложноотрицательного результата в модели прогноза стихийных бедствий.'
    },
    keywords: ['fails to detect', 'no warning', 'high-stakes', 'loss of life'],
    keywordsRu: ['распознала', 'предупреждения', 'тяжёлые', 'гибель'],
    model: {
      en: [
        'A false negative means the model <b>fails to detect</b> a real event (e.g. misses an approaching storm) (1).',
        'so no warning is issued and no preparations are made (1).',
        'which can have severe, high-stakes consequences — loss of life and property (1).'
      ],
      ru: ['Ложноотрицательный = модель не распознала реальное событие (пропустила шторм) → нет предупреждения и подготовки → тяжёлые последствия: гибель людей и ущерб.']
    }
  }
];

// Study notes data (compact, structured)
window.NOTES_DATA = {
  a1_1: {
    title: { en: 'A1.1 Computer hardware & operation', ru: 'A1.1 Аппаратное обеспечение и работа компьютера' },
    en: {
      'A1.1.1 Describe the functions and interactions of the main CPU components.': [
        '<b>Units:</b> arithmetic logic unit (ALU), control unit (CU).',
        '<b>Registers:</b> instruction register (IR), program counter (PC), memory address register (MAR), memory data register (MDR), accumulator (AC).',
        '<b>Buses:</b> address, data, control.',
        '<b>Processors:</b> single core processor, multi-core processor, co-processors.',
        'A diagrammatic representation of the relationship between the specified CPU components.'
      ],
      'A1.1.2 Describe the role of a GPU.': [
        'The architecture that allows graphics processing units (GPUs) to handle specific tasks and makes them suitable for complex computations.',
        'Real-world scenarios may include video games, artificial intelligence (AI), large simulations and other applications that require graphics rendering and machine learning.'
      ],
      'A1.1.3 Explain the differences between the CPU and the GPU. (HL only)': [
        'Differences in their design philosophies, usage scenarios.',
        'Differences in their core architecture, processing power, memory access, power efficiency.',
        'CPUs and GPUs working together: task division, data sharing, coordinating execution.'
      ],
      'A1.1.4 Explain the purposes of different types of primary memory.': [
        'Random-access memory (RAM), read only memory (ROM), cache (L1, L2, L3), registers.',
        'The interaction of the CPU with different types of memory to optimize performance.',
        'The relevance of the terms "cache miss" and "cache hit".'
      ],
      'A1.1.5 Describe the fetch, decode and execute cycle.': [
        'The basic operations a CPU performs to execute a single instruction in machine language.',
        'The interaction between memory and registers via the three buses: address, data, control.'
      ],
      'A1.1.6 Describe the process of pipelining in multi-core architectures. (HL only)': [
        'The instructions fetch, decode, execute.',
        'Write-back stages to improve the overall system performance in multi-core architectures.',
        'Overview of how cores in multi-core processors work independently and in parallel.'
      ],
      'A1.1.7 Describe internal and external types of secondary memory storage.': [
        'Internal hard drives: solid state drive (SSD), hard disk drive (HDD), embedded multimedia cards (eMMCs).',
        'External hard drives: SSD, HDD, optical drives, flash drives, memory cards, network attached storage (NAS).',
        'The scenarios in which the various types of drive are used.'
      ],
      'A1.1.8 Describe the concept of compression.': [
        'The differences between lossy compression methods and lossless compression methods.',
        'Run-length encoding and transform coding.'
      ],
      'A1.1.9 Describe the different types of services in cloud computing.': [
        'Services: software as a service (SaaS), platform as a service (PaaS), infrastructure as a service (IaaS).',
        'The differences between the approaches of SaaS, PaaS, and IaaS in various real-world scenarios, recognizing that different degrees of control and flexibility influence resource management and resource availability.'
      ]
    },
    ru: {
      'A1.1.1 Опишите функции и взаимодействия основных компонентов ЦП.': [
        '<b>Блоки:</b> арифметико-логическое устройство (АЛУ), устройство управления (CU).',
        '<b>Регистры:</b> регистр инструкций (IR), счётчик команд (PC), регистр адреса памяти (MAR), регистр данных памяти (MDR), аккумулятор (AC).',
        '<b>Шины:</b> адреса, данных, управления.',
        '<b>Процессоры:</b> одноядерный, многоядерный, сопроцессоры.',
        'Диаграмма взаимосвязи между указанными компонентами ЦП.'
      ],
      'A1.1.2 Опишите роль GPU.': [
        'Архитектура, позволяющая графическим процессорам (GPU) обрабатывать специфические задачи и подходящая для сложных вычислений.',
        'Примеры из жизни: видеоигры, искусственный интеллект (ИИ), масштабные симуляции и другие приложения, требующие графической отрисовки и машинного обучения.'
      ],
      'A1.1.3 Объясните различия между CPU и GPU. (только HL)': [
        'Различия в философии дизайна, сценариях использования.',
        'Различия в архитектуре ядер, вычислительной мощности, доступе к памяти, энергоэффективности.',
        'Совместная работа CPU и GPU: разделение задач, обмен данными, координация исполнения.'
      ],
      'A1.1.4 Объясните назначение разных типов основной памяти.': [
        'Оперативная память (RAM), постоянная память (ROM), кэш (L1, L2, L3), регистры.',
        'Взаимодействие ЦП с разными типами памяти для оптимизации производительности.',
        'Значение терминов «cache miss» и «cache hit».'
      ],
      'A1.1.5 Опишите цикл «выборка-декодирование-исполнение».': [
        'Базовые операции ЦП для исполнения одной инструкции в машинном коде.',
        'Взаимодействие памяти и регистров через три шины: адреса, данных, управления.'
      ],
      'A1.1.6 Опишите процесс конвейеризации в многоядерных архитектурах. (только HL)': [
        'Инструкции fetch, decode, execute.',
        'Стадии write-back для повышения общей производительности в многоядерных архитектурах.',
        'Обзор того, как ядра многоядерных процессоров работают независимо и параллельно.'
      ],
      'A1.1.7 Опишите внутренние и внешние типы вторичной памяти.': [
        'Внутренние жёсткие диски: SSD, HDD, встраиваемые мультимедийные карты (eMMC).',
        'Внешние диски: SSD, HDD, оптические диски, флешки, карты памяти, сетевое хранилище (NAS).',
        'Сценарии использования различных типов накопителей.'
      ],
      'A1.1.8 Опишите концепцию сжатия.': [
        'Различия между методами сжатия с потерями и без потерь.',
        'Кодирование длин серий (RLE) и трансформационное кодирование.'
      ],
      'A1.1.9 Опишите разные типы услуг облачных вычислений.': [
        'Услуги: программа как услуга (SaaS), платформа как услуга (PaaS), инфраструктура как услуга (IaaS).',
        'Различия подходов SaaS, PaaS и IaaS в реальных сценариях с учётом того, что разные степени контроля и гибкости влияют на управление ресурсами и их доступность.'
      ]
    }
  },

  a1_2: {
    title: { en: 'A1.2 Data representation & computer logic', ru: 'A1.2 Представление данных и логика' },
    en: {
      'A1.2.1 Describe the principal methods of representing data.': [
        'The representation of integers in binary and hexadecimal.',
        'Conversion of binary and hexadecimal integers to decimal, and vice versa.',
        'Conversion of integers from binary to hexadecimal, and vice versa.'
      ],
      'A1.2.2 Explain how binary is used to store data.': [
        'The fundamentals of binary encoding and the impact on data storage and retrieval.',
        'The mechanisms by which data such as integers, strings, characters, images, audio and video are stored in binary form.'
      ],
      'A1.2.3 Describe the purpose and use of logic gates.': [
        'The purpose and use of logic gates.',
        'The functions and applications of logic gates in computer systems.',
        'The role of logic gates in binary computing.',
        'Boolean operators: AND, OR, NOT, NAND, NOR, XOR, XNOR.'
      ],
      'A1.2.4 Construct and analyse truth tables.': [
        'Truth tables to predict the output of simple logic circuits.',
        'Truth tables to determine outputs from inputs for a problem description.',
        'Truth tables and their relationship to a Boolean expression, with inputs and outputs.',
        'Truth tables derived from logic diagrams to aid the simplification of logical expressions.',
        'Karnaugh maps and algebraic simplification to simplify output expressions.'
      ],
      'A1.2.5 Construct logic diagrams.': [
        'Logic diagrams to demonstrate how logic gates are connected and interact in a circuit.',
        'Use of standard gate symbols for AND, OR, NOT, NAND, NOR, XOR and XNOR gates.',
        'Inputs processed diagrammatically to produce outputs.',
        'Combinations of these gates to perform more complex logical operations.',
        'Boolean algebra rules to simplify complex logic diagrams and expressions.'
      ]
    },
    ru: {
      'A1.2.1 Опишите основные методы представления данных.': [
        'Представление целых чисел в двоичной и шестнадцатеричной системах.',
        'Преобразование двоичных и шестнадцатеричных целых в десятичные и наоборот.',
        'Преобразование целых из двоичной в шестнадцатеричную и наоборот.'
      ],
      'A1.2.2 Объясните, как двоичная система используется для хранения данных.': [
        'Основы двоичного кодирования и его влияние на хранение и извлечение данных.',
        'Механизмы хранения целых, строк, символов, изображений, аудио и видео в двоичном виде.'
      ],
      'A1.2.3 Опишите назначение и использование логических элементов.': [
        'Назначение и использование логических элементов.',
        'Функции и применение логических элементов в компьютерных системах.',
        'Роль логических элементов в двоичных вычислениях.',
        'Булевы операторы: AND, OR, NOT, NAND, NOR, XOR, XNOR.'
      ],
      'A1.2.4 Постройте и проанализируйте таблицы истинности.': [
        'Таблицы истинности для предсказания выхода простых логических схем.',
        'Таблицы истинности для определения выходов по входам из описания задачи.',
        'Связь таблиц истинности с булевым выражением (входы и выходы).',
        'Таблицы истинности, выводимые из логических диаграмм для упрощения логических выражений.',
        'Карты Карно и алгебраическое упрощение для упрощения выходных выражений.'
      ],
      'A1.2.5 Постройте логические диаграммы.': [
        'Логические диаграммы, показывающие, как элементы соединены и взаимодействуют в схеме.',
        'Использование стандартных обозначений AND, OR, NOT, NAND, NOR, XOR, XNOR.',
        'Входы, обрабатываемые диаграммно для получения выходов.',
        'Комбинации элементов для более сложных логических операций.',
        'Правила булевой алгебры для упрощения сложных логических диаграмм и выражений.'
      ]
    }
  },

  a1_3: {
    title: { en: 'A1.3 Operating systems & control systems', ru: 'A1.3 Операционные и управляющие системы' },
    en: {
      'A1.3.1 Describe the role of operating systems.': [
        'Operating systems abstract hardware complexities to manage system resources.'
      ],
      'A1.3.2 Describe the functions of an operating system.': [
        "Maintaining system integrity while running operating systems' background operations.",
        'Memory management, file system, device management, scheduling, security, accounting, graphical user interface (GUI), virtualization, networking.'
      ],
      'A1.3.3 Compare different approaches to scheduling.': [
        'Managing the execution of processes by allocating CPU time to optimize system performance.',
        'First-come first-served, round robin, multilevel queue scheduling, priority scheduling.'
      ],
      'A1.3.4 Evaluate the use of polling and interrupt handling.': [
        'Event frequency, CPU processing overheads, power source (battery or mains), event predictability, controlled latency, security concerns.',
        'Real-world scenarios may include keyboard and mouse inputs, network communications, disk input/output operations, embedded systems, real-time systems.'
      ],
      'A1.3.5 Explain the role of the operating system in managing multitasking and resource allocation. (HL only)': [
        'The challenges of multitasking and resource allocation, including task scheduling, resource contention and deadlock.'
      ],
      'A1.3.6 Describe the use of the control system components. (HL only)': [
        'The input, process, output, and feedback mechanism (open-loop, closed-loop).',
        'Controller, sensors, actuators, transducers and control algorithm.'
      ],
      'A1.3.7 Explain the use of control systems in a range of real-world applications. (HL only)': [
        'Examples may include autonomous vehicles, home thermostats, automatic elevator controllers, automatic washing machines, traffic signal control systems, irrigation control systems, home security systems, automatic doors.'
      ]
    },
    ru: {
      'A1.3.1 Опишите роль операционных систем.': [
        'Операционные системы скрывают сложность железа для управления ресурсами системы.'
      ],
      'A1.3.2 Опишите функции операционной системы.': [
        'Поддержание целостности системы при выполнении фоновых операций ОС.',
        'Управление памятью, файловая система, управление устройствами, планирование, безопасность, учёт, графический интерфейс (GUI), виртуализация, сеть.'
      ],
      'A1.3.3 Сравните различные подходы к планированию.': [
        'Управление исполнением процессов через распределение времени ЦП для оптимизации производительности.',
        'FCFS (первый пришёл — первый обслужен), round robin, многоуровневая очередь, приоритетное планирование.'
      ],
      'A1.3.4 Оцените использование опроса и обработки прерываний.': [
        'Частота событий, накладные расходы ЦП, источник питания (батарея или сеть), предсказуемость событий, контролируемая задержка, вопросы безопасности.',
        'Реальные сценарии: ввод с клавиатуры и мыши, сетевая коммуникация, операции ввода-вывода диска, встраиваемые системы, системы реального времени.'
      ],
      'A1.3.5 Объясните роль ОС в управлении многозадачностью и распределением ресурсов. (только HL)': [
        'Сложности многозадачности и распределения ресурсов: планирование задач, конкуренция за ресурсы и взаимоблокировка (deadlock).'
      ],
      'A1.3.6 Опишите использование компонентов управляющей системы. (только HL)': [
        'Механизм вход-процесс-выход-обратная-связь (разомкнутый, замкнутый контур).',
        'Контроллер, датчики, исполнительные механизмы, преобразователи и алгоритм управления.'
      ],
      'A1.3.7 Объясните использование управляющих систем в разных реальных приложениях. (только HL)': [
        'Примеры: беспилотные автомобили, домашние термостаты, автоматические контроллеры лифтов, стиральные машины, системы управления светофорами, ирригационные системы, домашние системы безопасности, автоматические двери.'
      ]
    }
  },

  a1_4: {
    title: { en: 'A1.4 Translation (HL)', ru: 'A1.4 Трансляция (HL)' },
    en: {
      'A1.4.1 Evaluate the translation processes of interpreters and compilers. (HL only)': [
        'The mechanics and use-cases of each translation approach.',
        'The difference in error detection, translation time, portability and applicability for different translation processes, including just-in-time compilation (JIT) and bytecode interpreters.',
        'Example scenarios where the translation method should be considered must include rapid development and testing, performance-critical applications and cross-platform development.'
      ]
    },
    ru: {
      'A1.4.1 Оцените процессы трансляции интерпретаторов и компиляторов. (только HL)': [
        'Механика и сценарии использования каждого подхода трансляции.',
        'Различия в обнаружении ошибок, времени трансляции, переносимости и применимости для разных процессов трансляции, включая JIT-компиляцию и интерпретаторы байт-кода.',
        'Сценарии, в которых стоит подумать о методе трансляции: быстрая разработка и тестирование, приложения с критичной производительностью и кросс-платформенная разработка.'
      ]
    }
  },

  a2_1: {
    title: { en: 'A2.1.1 Purpose & characteristics of networks', ru: 'A2.1.1 Назначение и характеристики сетей' },
    en: {
      'Core principles': [
        'A <b>network</b> is two or more devices connected so they can <b>share data and resources</b> (files, printers, internet connection, processing power).',
        '<b>Purpose</b> — transfer data, exchange information, share hardware and software, enable collaboration.',
        '<b>Characteristics</b> that define a network: <b>scope/distance</b> covered, <b>data transfer rate</b> (bandwidth), <b>reliability</b> (uptime), <b>security</b> (encryption, access control), <b>scalability</b> (room to add devices) and <b>cost</b>.'
      ],
      'LAN — Local Area Network': [
        '<b>Scope:</b> a single site — one room, building, school or office (up to ~1 km).',
        '<b>Properties:</b> high speed (1–100 Gbps), very low latency, owned by one organisation, easy to secure.',
        '<b>Use:</b> school computer labs, office workgroups, home Wi-Fi.'
      ],
      'WAN — Wide Area Network': [
        '<b>Scope:</b> cities, countries, continents — connects many LANs/MANs into one logical network.',
        '<b>Built from:</b> leased lines, fibre backbones, satellite links and the public internet (often secured by VPN).',
        '<b>Properties:</b> lower throughput per user and higher latency than a LAN, but global reach.',
        '<b>Use:</b> a multinational connecting its global offices, the internet itself.'
      ],
      'PAN — Personal Area Network': [
        '<b>Scope:</b> centred on one person — radius ~10 m.',
        '<b>Technology:</b> Bluetooth, Wi-Fi Direct, Zigbee, NFC.',
        '<b>Use:</b> phone ↔ smartwatch ↔ wireless earbuds; tethering a laptop to a phone.'
      ],
      'VPN — Virtual Private Network': [
        '<b>Extends</b> a private network across the public internet using an <b>encrypted tunnel</b>.',
        'A remote worker behaves as if directly plugged into the office LAN.',
        '<b>Benefits:</b> secure remote access; hides the user\'s IP/location; can bypass geo-restrictions; <b>no need for expensive dedicated lines</b> between sites.',
        '<b>Trade-offs:</b> slight latency from encryption; trust in the VPN provider.'
      ]
    },
    ru: {
      'Базовые принципы': [
        '<b>Сеть</b> — два и более устройств, соединённых так, чтобы <b>совместно использовать данные и ресурсы</b> (файлы, принтеры, интернет-канал, вычислительную мощность).',
        '<b>Назначение</b> — передача данных, обмен информацией, совместное использование железа и ПО, поддержка совместной работы.',
        '<b>Характеристики</b>, которыми описывают сеть: <b>радиус/расстояние</b>, <b>скорость передачи</b> (полоса), <b>надёжность</b> (uptime), <b>безопасность</b> (шифрование, контроль доступа), <b>масштабируемость</b> и <b>стоимость</b>.'
      ],
      'LAN — локальная сеть': [
        '<b>Радиус:</b> одна площадка — комната, здание, школа, офис (до ~1 км).',
        '<b>Свойства:</b> высокая скорость (1–100 Гбит/с), очень низкая задержка, принадлежит одной организации, легко защитить.',
        '<b>Примеры:</b> школьные кабинеты информатики, офисные рабочие группы, домашний Wi-Fi.'
      ],
      'WAN — глобальная сеть': [
        '<b>Радиус:</b> города, страны, континенты — объединяет много LAN/MAN в одну логическую сеть.',
        '<b>Строится из:</b> арендованных линий, оптических магистралей, спутниковых каналов и публичного интернета (часто защищается VPN).',
        '<b>Свойства:</b> ниже пропускная способность на пользователя и выше задержка, чем у LAN, но глобальный охват.',
        '<b>Примеры:</b> международная компания со множеством офисов, сам интернет.'
      ],
      'PAN — персональная сеть': [
        '<b>Радиус:</b> вокруг одного человека — ~10 м.',
        '<b>Технологии:</b> Bluetooth, Wi-Fi Direct, Zigbee, NFC.',
        '<b>Примеры:</b> телефон ↔ умные часы ↔ беспроводные наушники; раздача интернета с телефона на ноутбук.'
      ],
      'VPN — виртуальная частная сеть': [
        '<b>Расширяет</b> частную сеть через публичный интернет с помощью <b>шифрованного туннеля</b>.',
        'Удалённый работник работает так, будто напрямую включён в офисную LAN.',
        '<b>Плюсы:</b> безопасный удалённый доступ; скрывает IP/местоположение; обходит гео-ограничения; <b>не нужны дорогие выделенные линии</b> между офисами.',
        '<b>Минусы:</b> небольшая задержка из-за шифрования; нужно доверять провайдеру VPN.'
      ]
    }
  },

  a2_1_2: {
    title: { en: 'A2.1.2 Modern digital infrastructures', ru: 'A2.1.2 Современная цифровая инфраструктура' },
    en: {
      'The internet': [
        'A <b>global network of networks</b>: independent autonomous systems interconnected by standardised protocols (TCP/IP).',
        'The <b>World Wide Web</b> is one service that runs <b>over</b> the internet using HTTP/HTTPS.',
        '<b>Strengths:</b> universal reach, low marginal cost, open standards. <b>Limits:</b> variable bandwidth, censorship, security threats.'
      ],
      'Cloud computing': [
        '<b>On-demand</b> remote computing — storage, processing, software-as-a-service (SaaS), platform-as-a-service (PaaS), infrastructure-as-a-service (IaaS).',
        '<b>Pros:</b> scales elastically, pay-as-you-go, accessible anywhere, professional backups.',
        '<b>Cons:</b> needs reliable internet; raises <b>data-sovereignty</b> concerns (data stored in another country obeys that country\'s laws); third-party trust; egress and transfer costs; possible latency.'
      ],
      'Distributed systems': [
        'Many independent computers (<b>nodes</b>) cooperate as one coherent system by passing messages.',
        '<b>Benefits:</b> more compute, fault tolerance (one node down ≠ whole system down), geographic reach.',
        '<b>Challenges:</b> harder <b>consistency</b>, concurrency, security, partial failure handling.',
        '<b>Examples:</b> Google search index, blockchain, Bittorrent, large-scale databases.'
      ],
      'Edge & fog computing': [
        '<b>Edge:</b> processing happens <b>at or near the data source</b> (sensors, gateways, phones) instead of a distant data centre.',
        '<b>Why:</b> cuts latency, reduces bandwidth to the cloud, works during connectivity loss, helps privacy.',
        '<b>Use cases:</b> autonomous vehicles, industrial IoT, real-time video analytics.',
        '<b>Fog</b> sits between edge and cloud (regional micro-data-centres) — a middle tier for aggregation.',
        '<b>Trade-off:</b> many distributed devices are harder and costlier to secure and maintain.'
      ],
      'Mobile networks': [
        'Cellular networks (<b>2G → 3G → 4G/LTE → 5G</b>) hand connections from cell to cell as users move.',
        '<b>5G</b> adds higher bandwidth and very low latency, enabling new edge/IoT use cases.',
        '<b>Limitations:</b> dead zones, congestion, security risks (spoofed cell towers), battery cost of high-frequency radios.'
      ]
    },
    ru: {
      'Интернет': [
        '<b>Глобальная сеть сетей</b> — независимые автономные системы, соединённые стандартными протоколами (TCP/IP).',
        '<b>WWW (всемирная паутина)</b> — это лишь один сервис <b>поверх</b> интернета, работающий по HTTP/HTTPS.',
        '<b>Плюсы:</b> универсальный охват, низкая стоимость, открытые стандарты. <b>Минусы:</b> разная полоса, цензура, угрозы безопасности.'
      ],
      'Облачные вычисления': [
        '<b>По требованию</b>: удалённые хранилище, вычисления, ПО как услуга (SaaS), платформа (PaaS), инфраструктура (IaaS).',
        '<b>Плюсы:</b> эластичное масштабирование, оплата по факту, доступ откуда угодно, профессиональные бэкапы.',
        '<b>Минусы:</b> нужна устойчивая связь; вопросы <b>суверенитета данных</b> (данные в другой стране подчиняются её законам); доверие сторонним; стоимость трафика; возможные задержки.'
      ],
      'Распределённые системы': [
        'Много независимых компьютеров (<b>узлов</b>) работают как одно целое, обмениваясь сообщениями.',
        '<b>Плюсы:</b> больше мощности, отказоустойчивость (отказ одного ≠ отказу всего), географический охват.',
        '<b>Сложности:</b> <b>согласованность</b>, параллелизм, безопасность, обработка частичных отказов.',
        '<b>Примеры:</b> поисковый индекс Google, блокчейн, Bittorrent, крупные БД.'
      ],
      'Граничные (edge) и fog-вычисления': [
        '<b>Edge:</b> обработка происходит <b>рядом с источником</b> (датчики, шлюзы, телефоны), а не в далёком ЦОД.',
        '<b>Зачем:</b> снижает задержку, экономит канал к облаку, работает при потере связи, повышает приватность.',
        '<b>Применение:</b> беспилотные авто, промышленный IoT, видеоанализ в реальном времени.',
        '<b>Fog</b> — промежуточный слой (региональные мини-ЦОД) между edge и облаком, для агрегации.',
        '<b>Минус:</b> много распределённых устройств тяжело и дорого защищать и обслуживать.'
      ],
      'Мобильные сети': [
        'Сотовые сети (<b>2G → 3G → 4G/LTE → 5G</b>) передают соединение от ячейки к ячейке по мере движения.',
        '<b>5G</b> — выше скорость и очень низкая задержка, что открывает новые сценарии edge/IoT.',
        '<b>Ограничения:</b> «мёртвые зоны», заторы, безопасность (поддельные вышки), расход батареи на высокочастотные радио.'
      ]
    }
  },

  a2_1_3: {
    title: { en: 'A2.1.3 Function of network devices', ru: 'A2.1.3 Сетевые устройства' },
    en: {
      'Routers': [
        '<b>Function:</b> forward packets <b>between different networks</b> using the destination <b>IP address</b> and a routing table.',
        '<b>Layer:</b> Internet/Network (TCP/IP layer 3).',
        '<b>Where:</b> the boundary between a LAN and the internet (or between subnets).'
      ],
      'Switches': [
        '<b>Function:</b> connect devices <b>within the same LAN</b>, forwarding a frame only to the port of the destination <b>MAC address</b>.',
        '<b>Layer:</b> Network Access/Data-Link (TCP/IP layer 2).',
        '<b>Versus a hub:</b> a hub broadcasts every frame to every port → collisions and shared bandwidth. A switch learns MAC→port and sends only where needed.'
      ],
      'Modems': [
        '<b>Function:</b> <b>modulate</b> digital data into an analogue signal for the line and <b>demodulate</b> the incoming analogue signal back into digital data.',
        '<b>Where:</b> connects a home/office network to the ISP\'s line (DSL, cable, fibre ONT).'
      ],
      'NIC — Network Interface Card': [
        'The component that physically <b>connects a device to a network</b>.',
        'Holds the device\'s globally unique <b>48-bit MAC address</b>.',
        'Converts data between the device\'s binary form and the signals used on the medium.'
      ],
      'Gateway': [
        'Bridges <b>two networks that use different protocols</b> (e.g. a VoIP gateway translating between SIP and the public phone system; NAT between a private LAN and the internet).',
        'A home router is usually a combined modem + router + switch + Wi-Fi access point + NAT <b>gateway</b>.'
      ],
      'Other devices': [
        '<b>Wireless access point (WAP)</b> — lets wireless clients join a wired LAN; operates at layer 2.',
        '<b>Repeater / range extender</b> — amplifies a signal to cover greater distance (layer 1).',
        '<b>Bridge</b> — joins two LAN segments, learns MAC addresses; conceptually a two-port switch.',
        '<b>Firewall</b> — filters traffic by rules (covered in A2.4).'
      ]
    },
    ru: {
      'Маршрутизаторы (router)': [
        '<b>Функция:</b> передают пакеты <b>между разными сетями</b> по IP-адресу получателя и таблице маршрутизации.',
        '<b>Уровень:</b> межсетевой (TCP/IP уровень 3).',
        '<b>Где:</b> граница между LAN и интернетом (или между подсетями).'
      ],
      'Коммутаторы (switch)': [
        '<b>Функция:</b> соединяют устройства <b>внутри одной LAN</b>, направляя кадр только на порт нужного <b>MAC-адреса</b>.',
        '<b>Уровень:</b> канальный (TCP/IP уровень 2).',
        '<b>Против хаба:</b> хаб рассылает каждый кадр на все порты — коллизии и общая полоса. Коммутатор запоминает MAC↔порт и шлёт точечно.'
      ],
      'Модемы': [
        '<b>Функция:</b> <b>модулируют</b> цифровые данные в аналоговый сигнал линии и <b>демодулируют</b> входящий аналоговый сигнал в цифру.',
        '<b>Где:</b> соединяет домашнюю/офисную сеть с линией провайдера (DSL, кабель, оптика ONT).'
      ],
      'Сетевая карта (NIC)': [
        'Компонент, который физически <b>подключает устройство к сети</b>.',
        'Хранит уникальный <b>48-битный MAC-адрес</b> устройства.',
        'Преобразует данные между двоичной формой устройства и сигналами среды передачи.'
      ],
      'Шлюз (gateway)': [
        'Соединяет <b>две сети с разными протоколами</b> (например, VoIP-шлюз между SIP и обычной телефонией; NAT между приватной LAN и интернетом).',
        'Домашний роутер обычно — это модем + маршрутизатор + коммутатор + Wi-Fi точка + NAT-<b>шлюз</b> в одном корпусе.'
      ],
      'Другие устройства': [
        '<b>Точка доступа Wi-Fi (WAP)</b> — подключает беспроводных клиентов к проводной LAN; уровень 2.',
        '<b>Репитер / усилитель</b> — усиливает сигнал для большего радиуса (уровень 1).',
        '<b>Мост (bridge)</b> — соединяет два сегмента LAN, учит MAC-адреса; фактически двухпортовый коммутатор.',
        '<b>Файрвол</b> — фильтрует трафик по правилам (см. A2.4).'
      ]
    }
  },

  a2_1_4: {
    title: { en: 'A2.1.4 Network protocols', ru: 'A2.1.4 Сетевые протоколы' },
    en: {
      'Transport: TCP vs UDP': [
        '<b>TCP (Transmission Control Protocol)</b> — connection-oriented, reliable. Uses <b>handshake, acknowledgements, sequencing and retransmission</b>. Guarantees in-order, complete delivery — but has more overhead.',
        '<b>UDP (User Datagram Protocol)</b> — connectionless, <b>no delivery guarantee</b>, no ordering. Much lower overhead, much faster.',
        '<b>Choose TCP</b> when correctness matters: web pages (HTTP), email, file transfer, database transactions.',
        '<b>Choose UDP</b> when speed matters more than perfection: live video/voice, online gaming, DNS lookups — a lost packet that arrives late is worse than a missing one.'
      ],
      'Application protocols': [
        '<b>HTTP / HTTPS</b> — web pages and APIs (ports 80 / 443). HTTPS adds TLS encryption.',
        '<b>FTP / SFTP</b> — file transfer between computers.',
        '<b>SMTP</b> — send email (port 25/465/587).',
        '<b>IMAP / POP3</b> — retrieve email from a server (IMAP keeps it on the server, POP downloads & removes).',
        '<b>DNS</b> — translates human domain names to IP addresses (port 53, mainly UDP).',
        '<b>DHCP</b> — automatically assigns IP addresses, subnet mask, gateway and DNS to new devices.'
      ],
      'Port numbers': [
        'A 16-bit number identifying a specific <b>application/service</b> on a host, so one IP address can run many services in parallel (multiplexing).',
        '<b>Well-known ports:</b> HTTP 80, HTTPS 443, SSH 22, FTP 21, SMTP 25, DNS 53, DHCP 67/68.',
        'Combined with an IP address, a port forms a <b>socket</b> — the endpoint of a network connection.'
      ]
    },
    ru: {
      'Транспорт: TCP vs UDP': [
        '<b>TCP</b> — с установлением соединения, надёжный. Использует <b>рукопожатие, подтверждения, нумерацию и повтор</b>. Гарантирует упорядоченную полную доставку, но больше накладных расходов.',
        '<b>UDP</b> — без соединения, <b>без гарантии доставки</b> и порядка. Минимум накладных, гораздо быстрее.',
        '<b>TCP</b> — когда важна корректность: веб-страницы (HTTP), почта, передача файлов, транзакции БД.',
        '<b>UDP</b> — когда важнее скорость: видео/голос в реальном времени, онлайн-игры, DNS — опоздавший пакет хуже потерянного.'
      ],
      'Прикладные протоколы': [
        '<b>HTTP / HTTPS</b> — веб и API (порты 80 / 443). HTTPS добавляет TLS-шифрование.',
        '<b>FTP / SFTP</b> — передача файлов между компьютерами.',
        '<b>SMTP</b> — отправка почты (25/465/587).',
        '<b>IMAP / POP3</b> — получение почты с сервера (IMAP хранит на сервере, POP скачивает и удаляет).',
        '<b>DNS</b> — переводит доменные имена в IP-адреса (порт 53, в основном UDP).',
        '<b>DHCP</b> — автоматически выдаёт IP-адрес, маску, шлюз и DNS новым устройствам.'
      ],
      'Порты': [
        '16-битное число, идентифицирующее конкретное <b>приложение/сервис</b> на хосте; один IP обслуживает много сервисов параллельно (мультиплексирование).',
        '<b>Известные порты:</b> HTTP 80, HTTPS 443, SSH 22, FTP 21, SMTP 25, DNS 53, DHCP 67/68.',
        'IP + порт = <b>сокет</b>, конечная точка сетевого соединения.'
      ]
    }
  },

  a2_1_5: {
    title: { en: 'A2.1.5 Functions of the TCP/IP model (HL)', ru: 'A2.1.5 Функции модели TCP/IP (HL)' },
    en: {
      'The four layers': [
        '<b>Application layer</b> — user-facing protocols (HTTP, FTP, SMTP, DNS). Generates the data.',
        '<b>Transport layer</b> — TCP or UDP. Adds <b>port numbers</b>, segments the data, handles reliability if TCP.',
        '<b>Internet (Network) layer</b> — IP. Adds <b>IP addresses</b>, decides routing between networks. Routers operate here.',
        '<b>Network Access (Link/Data-Link) layer</b> — Ethernet, Wi-Fi. Adds the <b>MAC address</b> and turns frames into electrical/optical/radio signals. Switches operate here.'
      ],
      'Encapsulation': [
        '<b>Sender:</b> each layer wraps the data with its own <b>header</b> as it goes down — Application → Transport (adds port) → Internet (adds IP) → Link (adds MAC). The result is a <b>frame</b> on the wire.',
        '<b>Receiver:</b> each layer strips its header on the way up (de-encapsulation), passing the payload to the next layer until the application receives the original data.',
        '<b>Why it matters:</b> separation of concerns — each layer can be redesigned without breaking the others (e.g. Wi-Fi replacing Ethernet at layer 2 with no change to HTTP).'
      ],
      'Routing & switching in practice': [
        'A <b>router</b> reads the IP header to decide the next hop between networks; it rewrites the layer-2 (MAC) header for each hop but the IP packet survives end-to-end.',
        'A <b>switch</b> reads the MAC header to forward a frame within one LAN; it does <b>not</b> change the IP header.',
        'A web request from your laptop to a server: app HTTP → TCP port 443 → IP src/dst → Wi-Fi frame → router hops across the internet → server reverses the stack and the web page returns.'
      ]
    },
    ru: {
      'Четыре уровня': [
        '<b>Прикладной</b> — пользовательские протоколы (HTTP, FTP, SMTP, DNS). Создаёт данные.',
        '<b>Транспортный</b> — TCP или UDP. Добавляет <b>порты</b>, делит данные на сегменты, надёжность (если TCP).',
        '<b>Межсетевой</b> — IP. Добавляет <b>IP-адреса</b>, решает маршрутизацию между сетями. Здесь работают маршрутизаторы.',
        '<b>Сетевого доступа (канальный)</b> — Ethernet, Wi-Fi. Добавляет <b>MAC</b> и превращает кадры в электрические/оптические/радио-сигналы. Здесь работают коммутаторы.'
      ],
      'Инкапсуляция': [
        '<b>Отправитель:</b> каждый уровень оборачивает данные своим <b>заголовком</b> сверху вниз — прикладной → транспортный (порт) → межсетевой (IP) → канальный (MAC). На проводе это уже <b>кадр</b>.',
        '<b>Получатель:</b> каждый уровень снимает свой заголовок снизу вверх (де-инкапсуляция), передавая нагрузку следующему, пока приложение не получит исходные данные.',
        '<b>Зачем:</b> разделение ответственности — любой уровень можно переделать, не ломая других (Wi-Fi заменил Ethernet на 2-м, HTTP не заметил).'
      ],
      'Маршрутизация и коммутация на практике': [
        '<b>Маршрутизатор</b> читает IP-заголовок и решает следующий хоп между сетями; на каждом хопе переписывает канальный (MAC) заголовок, но IP-пакет идёт сквозь всю сеть.',
        '<b>Коммутатор</b> читает MAC-заголовок и пересылает кадр внутри одной LAN; IP-заголовок <b>не меняет</b>.',
        'Запрос с ноутбука к серверу: HTTP → TCP порт 443 → IP отправителя/получателя → Wi-Fi-кадр → маршрутизаторы в интернете → сервер раскрывает стек обратно, страница возвращается.'
      ]
    }
  },

  a2_2: {
    title: { en: 'A2.2 Network architecture, topologies & segmentation', ru: 'A2.2 Архитектура, топологии и сегментация' },
    en: {
      'Topology basics': [
        'A <b>topology</b> is the arrangement of nodes and links. <b>Physical</b> topology = the actual cabling layout; <b>logical</b> topology = how data flows.',
        'Choice affects <b>cost, reliability, speed, ease of fault-finding</b> and <b>scalability</b>.'
      ],
      'Star, mesh & hybrid': [
        '<b>Star</b> — every device connects to a central switch. Easy to add devices, fault on one cable affects only one device. <b>Centre is a single point of failure.</b> Used in most home/office LANs.',
        '<b>Mesh</b> — nodes connect to many other nodes (full mesh = every node to every other). <b>Very high redundancy</b>; data reroutes around failures; no single point of failure. <b>Expensive</b> to cable and scale. Used in Wi-Fi mesh systems and mission-critical networks.',
        '<b>Hybrid</b> — combines topologies (e.g. star core + mesh edge) to balance cost, speed and resilience. Used in most large/complex networks.',
        '<b>Bus / ring</b> — older topologies: a bus shares one backbone (one break breaks everything); a ring passes a token (failure of one node can break the loop).'
      ],
      'Servers': [
        'A <b>server</b> delivers data/resources/services to <b>clients</b>.',
        '<b>Key types:</b> <b>DNS</b> (domain name → IP), <b>DHCP</b> (auto-assign IPs), <b>web</b>, <b>mail</b>, <b>file</b>, <b>print</b>, <b>database</b>, <b>authentication</b>.'
      ],
      'Networking models': [
        '<b>Client-Server</b> — a central server provides resources to clients. Centralised administration, security, backups; the server is a <b>bottleneck / single point of failure</b>. Used for web, email, banking, school networks.',
        '<b>Peer-to-Peer (P2P)</b> — every node is both client and server. Decentralised — scales naturally as peers add bandwidth, no central point of failure — but harder to secure and manage. Used for blockchain, file-sharing (BitTorrent), some VoIP.',
        '<b>Hybrid</b> — many real systems mix both (e.g. a chat app uses a server for discovery and authentication but P2P for the media stream).'
      ],
      'Network segmentation': [
        'Splitting one network into smaller parts improves <b>security</b> (isolating sensitive departments) and <b>performance</b> (smaller broadcast domains = less congestion).',
        '<b>VLAN (Virtual LAN)</b> — a <b>logical</b> grouping at Layer 2 on switches; isolates traffic regardless of physical location (e.g. Finance VLAN spans 3 buildings).',
        '<b>Subnetting</b> — dividing the IP address space at Layer 3 into sub-networks (e.g. 192.168.10.0/24).'
      ]
    },
    ru: {
      'Основы топологии': [
        '<b>Топология</b> — расположение узлов и связей. <b>Физическая</b> = реальная разводка кабелей; <b>логическая</b> = как движутся данные.',
        'Выбор влияет на <b>стоимость, надёжность, скорость, удобство поиска неисправностей</b> и <b>масштабируемость</b>.'
      ],
      'Звезда, mesh и гибрид': [
        '<b>Звезда</b> — все устройства подключены к центральному коммутатору. Легко добавлять устройства, обрыв одного кабеля влияет только на одно устройство. <b>Центральный коммутатор — единая точка отказа.</b> Большинство домашних/офисных LAN.',
        '<b>Mesh</b> — узлы связаны со многими другими (полная сетка — каждый с каждым). <b>Очень высокая надёжность/резервирование</b>; данные обходят отказы; нет единой точки отказа. <b>Дорого</b> прокладывать и масштабировать. Wi-Fi mesh, отказоустойчивые сети.',
        '<b>Гибрид</b> — сочетает топологии (ядро-звезда + край-mesh) для баланса цены, скорости и устойчивости. Большинство крупных сетей.',
        '<b>Шина / кольцо</b> — старые топологии: шина — одна общая магистраль (один обрыв ломает всё); кольцо — передача токена (отказ узла может разорвать кольцо).'
      ],
      'Серверы': [
        '<b>Сервер</b> предоставляет данные/ресурсы/сервисы <b>клиентам</b>.',
        '<b>Важные типы:</b> <b>DNS</b> (домен → IP), <b>DHCP</b> (автоназначение IP), <b>веб</b>, <b>почтовый</b>, <b>файловый</b>, <b>принт</b>, <b>БД</b>, <b>аутентификация</b>.'
      ],
      'Сетевые модели': [
        '<b>Клиент-сервер</b> — центральный сервер выдаёт ресурсы клиентам. Проще централизованное администрирование, безопасность, бэкапы; сервер — <b>узкое место и единая точка отказа</b>. Веб, почта, банкинг, школьные сети.',
        '<b>P2P (одноранговая)</b> — каждый узел и клиент, и сервер. Децентрализована — масштабируется сама, нет единой точки отказа — но сложнее защищать и управлять. Блокчейн, файлообмен (BitTorrent), часть VoIP.',
        '<b>Гибрид</b> — на практике многие сервисы смешивают (мессенджер использует сервер для поиска контактов и аутентификации, но P2P для медиапотока).'
      ],
      'Сегментация сети': [
        'Разбиение сети на части повышает <b>безопасность</b> (изоляция важных отделов) и <b>производительность</b> (меньше широковещательных доменов = меньше заторов).',
        '<b>VLAN (виртуальная LAN)</b> — <b>логическое</b> разделение на 2-м уровне на коммутаторах; изолирует трафик независимо от физического размещения (например, VLAN финансов охватывает 3 здания).',
        '<b>Подсети (subnetting)</b> — деление пространства IP-адресов на 3-м уровне (например, 192.168.10.0/24).'
      ]
    }
  },

  a2_3: {
    title: { en: 'A2.3 Data transmission (IP, media, packet switching)', ru: 'A2.3 Передача данных (IP, среды, коммутация пакетов)' },
    en: {
      'IP addressing': [
        '<b>IPv4</b> — 32-bit (~4.3 billion addresses), dotted decimal e.g. <code>192.168.1.1</code>.',
        '<b>IPv6</b> — 128-bit (~3.4×10³⁸ addresses), hexadecimal with colons. Created because IPv4 addresses ran out.',
        '<b>Public vs private</b> — public addresses are globally unique and routed on the internet; private ranges (<code>192.168.x.x</code>, <code>10.x.x.x</code>, <code>172.16–31.x.x</code>) are reused inside LANs and are not routed on the internet.',
        '<b>Static vs dynamic</b> — static IPs are fixed and manually set (good for servers); dynamic IPs are leased temporarily by a <b>DHCP</b> server from a pool.',
        '<b>NAT (Network Address Translation)</b> — lets many private devices share one public IP, conserving IPv4 and hiding internal hosts (a basic security benefit).'
      ],
      'Transmission media': [
        '<b>Twisted pair (UTP)</b> — cheap, easy, but limited range (~100 m) and prone to interference.',
        '<b>Coaxial</b> — better shielding than UTP; used in cable broadband.',
        '<b>Fibre optic</b> — uses light pulses; very high speed over long distances; immune to electromagnetic interference (EMI); expensive and fragile.',
        '<b>Wireless</b> (Wi-Fi, cellular, satellite) — high mobility, but more interference and security risk.'
      ],
      'Packet switching': [
        'Data is split into <b>packets</b>, each with a header (source IP, destination IP, <b>sequence number</b>, checksum) and payload.',
        'Packets travel <b>independently</b> by the best available route and are <b>reassembled in order</b> at the destination — efficient, fault-tolerant use of the network.',
        'Contrast with old <b>circuit switching</b> (e.g. classic telephone) which reserved a dedicated line for the whole call.'
      ],
      'Routing': [
        '<b>Static routing</b> — routes are fixed and configured manually; predictable but doesn\'t adapt.',
        '<b>Dynamic routing</b> — routers exchange information (OSPF, BGP) and automatically adapt to congestion or failure.'
      ]
    },
    ru: {
      'IP-адресация': [
        '<b>IPv4</b> — 32-битный (~4,3 млрд адресов), формат <code>192.168.1.1</code>.',
        '<b>IPv6</b> — 128-битный (~3,4×10³⁸ адресов), шестнадцатеричный с двоеточиями. Создан из-за нехватки IPv4.',
        '<b>Публичные и частные</b> — публичные уникальны и маршрутизируются в интернете; частные диапазоны (<code>192.168.x.x</code>, <code>10.x.x.x</code>, <code>172.16–31.x.x</code>) повторно используются в LAN и не идут в интернет.',
        '<b>Статические и динамические</b> — статические фиксированы и заданы вручную (для серверов); динамические сервер <b>DHCP</b> выдаёт временно из пула.',
        '<b>NAT</b> — много частных устройств за одним публичным IP: экономит адреса IPv4 и скрывает внутренние хосты (базовая защита).'
      ],
      'Среды передачи': [
        '<b>Витая пара (UTP)</b> — дёшево и просто, но малый радиус (~100 м) и помехи.',
        '<b>Коаксиальный кабель</b> — лучше экранирован, чем UTP; используется в кабельных провайдерах.',
        '<b>Оптоволокно</b> — свет, очень высокая скорость на больших расстояниях, не подвержено электромагнитным помехам (EMI); дорого и хрупко.',
        '<b>Беспроводная</b> (Wi-Fi, сотовая, спутник) — мобильно, но больше помех и рисков безопасности.'
      ],
      'Коммутация пакетов': [
        'Данные делятся на <b>пакеты</b> с заголовком (IP отправителя, IP получателя, <b>порядковый номер</b>, контрольная сумма) и нагрузкой.',
        'Пакеты идут <b>независимо</b> по лучшему маршруту и <b>собираются по порядку</b> у получателя — эффективное, отказоустойчивое использование сети.',
        'Сравните с устаревшей <b>коммутацией каналов</b> (классическая телефония), где на весь разговор резервировалась выделенная линия.'
      ],
      'Маршрутизация': [
        '<b>Статическая</b> — маршруты заданы вручную; предсказуемо, но не подстраивается.',
        '<b>Динамическая</b> — маршрутизаторы обмениваются информацией (OSPF, BGP) и автоматически реагируют на заторы и отказы.'
      ]
    }
  },

  a2_4: {
    title: { en: 'A2.4 Network security', ru: 'A2.4 Сетевая безопасность' },
    en: {
      'Firewalls': [
        'A <b>firewall</b> monitors and filters packets against rules — by source/destination IP, port, protocol, or application content. Can be a dedicated appliance, a router function, or host software.',
        '<b>Strengths:</b> traffic logging, access control, application-level inspection.',
        '<b>Limitations:</b> weak against insider threats; can be bypassed by sophisticated/encrypted attacks; complex to configure; deep inspection adds latency.'
      ],
      'Common threats': [
        '<b>DDoS</b> — flooding a service with traffic to exhaust it.',
        '<b>Malware</b> — viruses, worms, ransomware, trojans, spyware.',
        '<b>Phishing / social engineering</b> — tricking a user into revealing credentials or running attacker code.',
        '<b>Man-in-the-Middle (MitM)</b> — secretly relaying and possibly altering communications between two parties.',
        '<b>SQL injection</b> — exploiting unfiltered input to a database (more in A3).'
      ],
      'Countermeasures': [
        'Firewalls + intrusion detection/prevention systems (IDS/IPS).',
        '<b>Strong authentication</b> — multi-factor authentication (MFA), unique passwords.',
        '<b>Encryption</b> in transit (TLS/HTTPS) and at rest (disk encryption).',
        'Regular <b>patching</b> of OS and applications.',
        '<b>VPNs</b> for remote access.',
        '<b>User training</b> — many breaches start with a human click.'
      ],
      'Encryption': [
        '<b>Encryption</b> converts plaintext into ciphertext so only authorised parties can read it.',
        '<b>Symmetric</b> — one shared key used for both encrypt and decrypt (fast, but key distribution is the problem). Algorithms: AES.',
        '<b>Asymmetric</b> — a <b>public/private key pair</b>; anything encrypted with one can only be decrypted with the other. Slower, but solves key exchange and enables digital signatures. Algorithms: RSA, elliptic curve.',
        'HTTPS uses asymmetric encryption to <b>exchange a fresh symmetric key</b>, then encrypts the bulk data symmetrically (fast + secure).'
      ],
      'Digital certificates': [
        'Issued by a trusted <b>Certificate Authority (CA)</b>; bind a server\'s identity to a public key.',
        'Your browser ships with a list of trusted CAs; when it sees a certificate, it verifies the chain back to one — that\'s why HTTPS is trustworthy.',
        'A certificate also lets the server <b>prove its identity</b>, preventing MitM impersonation.'
      ]
    },
    ru: {
      'Файрволы': [
        '<b>Межсетевой экран</b> отслеживает и фильтрует пакеты по правилам — IP отправителя/получателя, порт, протокол, содержимое приложения. Бывает отдельным устройством, функцией роутера или ПО на хосте.',
        '<b>Плюсы:</b> логирование трафика, контроль доступа, проверка на уровне приложений.',
        '<b>Минусы:</b> слаб против внутренних угроз; обходится сложными/шифрованными атаками; сложен в настройке; глубокая проверка добавляет задержку.'
      ],
      'Типичные угрозы': [
        '<b>DDoS</b> — перегрузка сервиса трафиком для отказа в обслуживании.',
        '<b>Вредоносное ПО</b> — вирусы, черви, шифровальщики, трояны, шпионы.',
        '<b>Фишинг / социальная инженерия</b> — обман пользователя для получения паролей или запуска кода атакующего.',
        '<b>Атака «человек посередине» (MitM)</b> — скрытое посредничество в обмене между двумя сторонами, иногда с подменой.',
        '<b>SQL-инъекция</b> — эксплуатация необработанного ввода в БД (см. A3).'
      ],
      'Меры защиты': [
        'Файрволы + системы обнаружения/предотвращения вторжений (IDS/IPS).',
        '<b>Сильная аутентификация</b> — многофакторная (MFA), уникальные пароли.',
        '<b>Шифрование</b> в пути (TLS/HTTPS) и на диске.',
        'Регулярные <b>обновления</b> ОС и приложений.',
        '<b>VPN</b> для удалённого доступа.',
        '<b>Обучение пользователей</b> — большая часть взломов начинается с клика человека.'
      ],
      'Шифрование': [
        '<b>Шифрование</b> превращает открытый текст в шифртекст, читаемый только авторизованным сторонам.',
        '<b>Симметричное</b> — один общий ключ для шифрования и расшифровки (быстро, но проблема — как обменяться ключом). Алгоритмы: AES.',
        '<b>Асимметричное</b> — пара <b>открытый/закрытый ключ</b>; зашифрованное одним расшифровывается только другим. Медленнее, но решает обмен ключами и даёт цифровые подписи. Алгоритмы: RSA, эллиптические кривые.',
        'HTTPS использует асимметричное шифрование, чтобы <b>обменяться новым симметричным ключом</b>, а затем шифрует основные данные симметрично (быстро + безопасно).'
      ],
      'Цифровые сертификаты': [
        'Выдаются доверенным <b>центром сертификации (CA)</b>; связывают сервер с открытым ключом.',
        'Браузер содержит список доверенных CA; видя сертификат, он проверяет цепочку до одного из них — поэтому HTTPS можно доверять.',
        'Сертификат также позволяет серверу <b>подтвердить свою личность</b>, защищая от MitM-подмены.'
      ]
    }
  },

  a3_1: {
    title: { en: 'A3.1 Database fundamentals', ru: 'A3.1 Основы баз данных' },
    en: {
      'What is a database': [
        'A <b>database</b> is an organised collection of data, stored logically (usually in interconnected tables) and accessed electronically from a computer system.',
        'A <b>DBMS</b> (database management system) is the software that lets users define, query and administer the data (e.g. MySQL, PostgreSQL, SQLite, Oracle).'
      ],
      'Flat-file problems & anomalies': [
        'Storing everything in one wide table repeats data, wastes space and causes inconsistency. Three anomalies result:',
        '• <b>Insert anomaly</b> — you cannot add one entity without data about another (e.g. cannot record a new vet until they treat a patient).',
        '• <b>Delete anomaly</b> — deleting one record removes other needed data too.',
        '• <b>Update anomaly</b> — if a repeated value is changed in some places but not all, the data becomes inconsistent.',
        'Solution: <b>normalization</b> (see A3.2).'
      ],
      'Relational model terms': [
        '<b>Entity / table</b> — a real-world object data is stored about (e.g. <i>Member</i>, <i>Book</i>).',
        '<b>Tuple / record / row</b> — one instance of that entity.',
        '<b>Attribute / field / column</b> — one property of the entity.'
      ],
      'Keys & integrity': [
        '<b>Primary key (PK)</b> — uniquely identifies each record in a table (e.g. <code>StudentID</code>).',
        '<b>Foreign key (FK)</b> — a field that refers to the PK of another table, creating the <b>link/relationship</b>.',
        '<b>Referential integrity</b> — a set of rules keeping relationships consistent: every foreign key must always point to a valid existing primary key (e.g. you cannot loan a book to a member who does not exist).'
      ],
      'Relationships': [
        '<b>One-to-one (1:1)</b> — each A relates to one B (e.g. Person ↔ Passport).',
        '<b>One-to-many (1:M)</b> — each A relates to many B but each B to one A (e.g. Author → Books).',
        '<b>Many-to-many (M:N)</b> — many A relate to many B (e.g. Students ↔ Courses). <b>M:N must be resolved using a junction (link) table</b>.'
      ],
      'Limits of the relational model': [
        'A rigid predefined <b>schema</b> fits poorly with varied/unstructured data (audio, images, X-rays).',
        '<b>Object-relational mismatch</b> — complex OOP objects (with inheritance) are awkward to map into flat tables.',
        'For such data a <b>NoSQL/document</b> or specialised store may be a better fit (see A3.4).'
      ]
    },
    ru: {
      'Что такое БД': [
        '<b>База данных</b> — организованная коллекция данных, хранимая логически (обычно во взаимосвязанных таблицах) и доступная электронно.',
        '<b>СУБД</b> — программа, которая позволяет создавать, запрашивать и администрировать данные (MySQL, PostgreSQL, SQLite, Oracle).'
      ],
      'Проблемы плоского файла и аномалии': [
        'Хранение всего в одной широкой таблице дублирует данные, тратит место и порождает несогласованность. Три аномалии:',
        '• <b>Аномалия вставки</b> — нельзя добавить одну сущность без данных о другой (нельзя внести нового ветеринара, пока он не лечит пациента).',
        '• <b>Аномалия удаления</b> — удаление одной записи стирает и другие нужные данные.',
        '• <b>Аномалия обновления</b> — если повторяющееся значение поменяли не везде, данные становятся противоречивыми.',
        'Решение — <b>нормализация</b> (см. A3.2).'
      ],
      'Термины реляционной модели': [
        '<b>Сущность / таблица</b> — объект реального мира, о котором хранят данные (<i>Читатель</i>, <i>Книга</i>).',
        '<b>Кортеж / запись / строка</b> — один экземпляр сущности.',
        '<b>Атрибут / поле / столбец</b> — одно свойство сущности.'
      ],
      'Ключи и целостность': [
        '<b>Первичный ключ (PK)</b> — однозначно идентифицирует запись (<code>StudentID</code>).',
        '<b>Внешний ключ (FK)</b> — поле, ссылающееся на PK другой таблицы; создаёт <b>связь</b>.',
        '<b>Ссылочная целостность</b> — правила, поддерживающие согласованность: внешний ключ всегда указывает на существующий первичный (нельзя выдать книгу несуществующему читателю).'
      ],
      'Типы связей': [
        '<b>1:1</b> — каждый A связан с одним B (Человек ↔ Паспорт).',
        '<b>1:M (один-ко-многим)</b> — A связан со многими B, но каждый B — с одним A (Автор → Книги).',
        '<b>M:N (многие-ко-многим)</b> — многие A связаны со многими B (Студенты ↔ Курсы). <b>M:N разрешается через связующую (junction) таблицу</b>.'
      ],
      'Ограничения реляционной модели': [
        'Жёсткая заранее заданная <b>схема</b> плохо подходит для разнородных/неструктурированных данных (аудио, изображения, снимки).',
        '<b>Object-relational mismatch</b> — сложные ООП-объекты с наследованием тяжело отображать в плоские таблицы.',
        'Для таких данных лучше <b>NoSQL/документная</b> или специализированная БД (см. A3.4).'
      ]
    }
  },

  a3_2: {
    title: { en: 'A3.2 Database design (schemas, normalization)', ru: 'A3.2 Проектирование БД (схемы, нормализация)' },
    en: {
      'Schemas': [
        '<b>Schema</b> — a blueprint of the database (entities, attributes, relationships, constraints) that contains <b>no actual data</b>. Three levels:',
        '<b>Conceptual</b> — most abstract: just entities and the relationships between them (seen via an ERD).',
        '<b>Logical</b> — adds attributes, primary and foreign keys, normalization.',
        '<b>Physical</b> — adds data types, storage structures, indexes: how data is actually stored on disk.'
      ],
      'Entity-Relationship Diagram (ERD)': [
        'Visual model showing <b>entities</b> (rectangles), <b>attributes</b> (ovals or listed inside), and <b>relationships</b> (verbs on the line between them).',
        '<b>Cardinality</b> is marked at each end (1, M, N) — defines whether each row in A relates to one or many rows in B.',
        'A <b>M:N</b> relationship is split into two 1:M relationships using a <b>junction table</b> (e.g. Vet–Pet → Appointment table holding VetID + PetID).'
      ],
      'Normalization': [
        'Reorganising data to reduce redundancy and eliminate update/insert/delete anomalies.',
        '<b>1NF (First Normal Form)</b> — all values <b>atomic</b> (one value per cell) and no repeating groups.',
        '<b>2NF</b> — in 1NF <b>and</b> no <b>partial dependency</b>: a non-key attribute must depend on the <i>whole</i> composite key, not just part of it.',
        '<b>3NF</b> — in 2NF <b>and</b> no <b>transitive dependency</b>: a non-key attribute must depend only on the primary key, not on another non-key attribute.'
      ],
      'Denormalization': [
        '<b>Denormalization</b> — deliberately re-introducing redundancy to improve <b>read performance</b> (fewer joins) at the cost of extra storage and the risk of update anomalies.',
        'Used in high-traffic / analytical systems where reads vastly outnumber writes (social media feeds, dashboards).'
      ]
    },
    ru: {
      'Схемы': [
        '<b>Схема</b> — план базы (сущности, атрибуты, связи, ограничения) <b>без реальных данных</b>. Три уровня:',
        '<b>Концептуальная</b> — самая абстрактная: только сущности и связи между ними (через ERD).',
        '<b>Логическая</b> — добавляет атрибуты, первичные/внешние ключи, нормализацию.',
        '<b>Физическая</b> — добавляет типы данных, структуры хранения, индексы: как данные лежат на диске.'
      ],
      'Диаграмма «сущность-связь» (ERD)': [
        'Визуальная модель: <b>сущности</b> (прямоугольники), <b>атрибуты</b> (овалы или внутри), <b>связи</b> (глаголы на линии).',
        '<b>Кардинальность</b> отмечается на концах (1, M, N) — сколько строк A соответствует одной строке B.',
        '<b>M:N</b> разбивается на две связи 1:M через <b>связующую таблицу</b> (Ветеринар–Питомец → таблица «Приём» с VetID и PetID).'
      ],
      'Нормализация': [
        'Реорганизация данных для снижения избыточности и устранения аномалий.',
        '<b>1НФ</b> — все значения <b>атомарны</b> (одно значение в ячейке), нет повторяющихся групп.',
        '<b>2НФ</b> — уже в 1НФ <b>и</b> нет <b>частичной зависимости</b>: неключевой атрибут зависит от <i>всего</i> составного ключа, а не от части.',
        '<b>3НФ</b> — уже в 2НФ <b>и</b> нет <b>транзитивной зависимости</b>: неключевой атрибут зависит только от первичного ключа, а не от другого неключевого.'
      ],
      'Денормализация': [
        '<b>Денормализация</b> — намеренное добавление избыточности ради <b>скорости чтения</b> (меньше join\'ов) ценой места и риска аномалий обновления.',
        'Применяется в высоконагруженных / аналитических системах, где чтений намного больше, чем записей (ленты соцсетей, дашборды).'
      ]
    }
  },

  a3_3: {
    title: { en: 'A3.3 Database programming (SQL, views, transactions)', ru: 'A3.3 Программирование БД (SQL, представления, транзакции)' },
    en: {
      'SQL language families': [
        '<b>DDL (Data Definition Language)</b> — defines structure: <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>.',
        '<b>DML (Data Manipulation Language)</b> — handles data: <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>.',
        '<b>DCL (Data Control Language)</b> — controls access: <code>GRANT</code>, <code>REVOKE</code>.',
        '<b>TCL (Transaction Control)</b> (HL) — <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code>.'
      ],
      'Queries & joins': [
        '<code>SELECT … FROM … WHERE …</code> retrieves columns from rows that match a filter.',
        '<b>JOIN</b> combines rows from two tables on a matching condition — usually <b>FK = PK</b> (e.g. <code>JOIN APPOINTMENT ON PATIENT.PatientID = APPOINTMENT.PatientID</code>).',
        'Without a JOIN condition you get a <b>Cartesian product</b> (every row × every row — usually a bug).'
      ],
      'The WHERE clause matters': [
        'Critical in <code>UPDATE</code> and <code>DELETE</code>: without it, <b>every row</b> in the table is changed/removed — a serious data-integrity error.',
        'Always target the intended records, e.g. <code>WHERE ProductID = \'P105\'</code>.'
      ],
      'Aggregates & grouping': [
        '<code>SUM</code>, <code>AVG</code>, <code>COUNT</code>, <code>MIN</code>, <code>MAX</code> compute over a set of rows.',
        'Often combined with <code>GROUP BY</code> to get one row per group (e.g. total sales per product).'
      ],
      'Views (HL)': [
        'A <b>view</b> is a <b>virtual table</b> defined by a stored <code>SELECT</code> query.',
        'Data is <b>not</b> stored separately — it is generated from the underlying base tables each time the view is queried.',
        'Views simplify complex queries and improve security by exposing only the selected columns/rows.'
      ],
      'Transactions & ACID (HL)': [
        'A <b>transaction</b> groups operations to be treated as one logical unit.',
        '<b>Atomicity</b> — "all or nothing": if any step fails, <code>ROLLBACK</code> undoes everything back to the last <code>COMMIT</code>.',
        '<b>Consistency</b> — the database moves from one valid state to another (constraints, FKs respected).',
        '<b>Isolation</b> — concurrent transactions don\'t see each other\'s partial work.',
        '<b>Durability</b> — once committed, the change survives crashes.',
        'Classic example: bank transfer — debit A then credit B must both succeed or money would vanish.'
      ]
    },
    ru: {
      'Семейства SQL': [
        '<b>DDL</b> — структура: <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>.',
        '<b>DML</b> — данные: <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>.',
        '<b>DCL</b> — доступ: <code>GRANT</code>, <code>REVOKE</code>.',
        '<b>TCL</b> (HL) — транзакции: <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code>.'
      ],
      'Запросы и соединения': [
        '<code>SELECT … FROM … WHERE …</code> — выбор столбцов из строк, удовлетворяющих фильтру.',
        '<b>JOIN</b> объединяет строки двух таблиц по условию — обычно <b>FK = PK</b> (например, <code>JOIN APPOINTMENT ON PATIENT.PatientID = APPOINTMENT.PatientID</code>).',
        'Без условия соединения получите <b>декартово произведение</b> (каждую строку × каждую — обычно баг).'
      ],
      'Важность WHERE': [
        'Критично в <code>UPDATE</code> и <code>DELETE</code>: без него меняются/удаляются <b>все строки</b> — серьёзная ошибка целостности.',
        'Всегда таргетируйте нужные записи: <code>WHERE ProductID = \'P105\'</code>.'
      ],
      'Агрегаты и группировка': [
        '<code>SUM</code>, <code>AVG</code>, <code>COUNT</code>, <code>MIN</code>, <code>MAX</code> — считают по набору строк.',
        'Часто с <code>GROUP BY</code>, чтобы получить одну строку на группу (например, сумма продаж по товару).'
      ],
      'Представления (Views, HL)': [
        '<b>Представление</b> — <b>виртуальная таблица</b> на основе сохранённого <code>SELECT</code>.',
        'Данные <b>не</b> хранятся отдельно — формируются из базовых таблиц при каждом обращении к представлению.',
        'Упрощают сложные запросы и повышают безопасность, показывая лишь нужные столбцы/строки.'
      ],
      'Транзакции и ACID (HL)': [
        '<b>Транзакция</b> объединяет операции как одно логическое целое.',
        '<b>Атомарность</b> — «всё или ничего»: при сбое любого шага <code>ROLLBACK</code> отменяет всё до последнего <code>COMMIT</code>.',
        '<b>Согласованность</b> — БД переходит из одного валидного состояния в другое (соблюдены ограничения, FK).',
        '<b>Изолированность</b> — параллельные транзакции не видят промежуточной работы друг друга.',
        '<b>Устойчивость (Durability)</b> — после COMMIT изменение переживает падение системы.',
        'Классический пример: банковский перевод — списание с A и зачисление B должны пройти оба, иначе деньги «исчезнут».'
      ]
    }
  },

  a3_4: {
    title: { en: 'A3.4 Alternative DBs & warehouses (HL)', ru: 'A3.4 Альтернативные БД и хранилища (HL)' },
    en: {
      'Beyond relational': [
        '<b>NoSQL</b> — flexible documents instead of fixed tables; horizontal scaling (add servers).',
        '<b>Distributed DB</b> — data on many sites: higher availability, harder consistency.',
        '<b>Data warehouse</b> — large analytical store; subject-oriented, integrated, time-variant, <b>non-volatile</b>.',
        '<b>ETL</b>: <b>E</b>xtract → <b>T</b>ransform → <b>L</b>oad.',
        '<b>OLAP</b> answers "what happened" (cubes). <b>Data mining</b> answers "why" / "what will happen" (patterns, prediction).'
      ]
    },
    ru: {
      'За пределами реляционной': [
        '<b>NoSQL</b> — гибкие документы вместо таблиц; горизонтальное масштабирование (добавляем серверы).',
        '<b>Распределённая БД</b> — данные на многих площадках: выше доступность, сложнее согласованность.',
        '<b>Хранилище данных</b> — большое аналитическое хранилище; предметно-ориентированное, интегрированное, изменяющееся во времени, <b>неизменяемое</b>.',
        '<b>ETL</b>: <b>E</b>xtract → <b>T</b>ransform → <b>L</b>oad.',
        '<b>OLAP</b> отвечает на «что произошло» (кубы). <b>Data mining</b> — «почему» / «что будет» (закономерности, прогноз).'
      ]
    }
  },

  a4_1: {
    title: { en: 'A4.1 Machine-learning fundamentals', ru: 'A4.1 Основы машинного обучения' },
    en: {
      'The AI hierarchy': [
        '<b>Artificial Intelligence (AI)</b> — the broad idea of machines imitating human intelligence.',
        '<b>Machine Learning (ML)</b> — a <b>subset</b> of AI that learns from data without being explicitly programmed.',
        '<b>Deep Learning (DL)</b> — a <b>subset</b> of ML using multi-layered neural networks for complex patterns.',
        'So: <b>AI ⊃ ML ⊃ DL</b>.'
      ],
      'The five types of machine learning': [
        '<b>Supervised learning</b> — trains on a <b>labelled</b> dataset (inputs + correct outputs) to predict outputs for new data. Split into <b>classification</b> (discrete categories — spam/not-spam) and <b>regression</b> (continuous values — house price).',
        '<b>Unsupervised learning</b> — finds patterns in <b>unlabelled</b> data; main method is <b>clustering</b> (grouping by similarity), also dimensionality reduction and market-basket analysis.',
        '<b>Reinforcement learning</b> — an <b>agent</b> learns by trial and error in an environment, receiving <b>rewards</b> for good actions and <b>penalties</b> for bad ones (robotics, game-playing, recommendation systems).',
        '<b>Deep learning</b> — deep artificial neural networks (CNNs for images, RNNs/Transformers for sequence data) for complex tasks like vision and language.',
        '<b>Transfer learning</b> — reuses a model trained on one task as the starting point for a related task, saving time and data.'
      ],
      'Hardware for ML': [
        '<b>GPU</b> — massively parallel; ideal for training neural networks.',
        '<b>ASIC</b> (Application-Specific Integrated Circuit) — custom-built for one fixed task; highest speed/efficiency but inflexible (e.g. high-frequency trading where microseconds matter).',
        '<b>FPGA</b> — reconfigurable hardware; flexible but slower than a dedicated ASIC.',
        '<b>TPU</b> — Google\'s tensor processing unit, optimised for ML workloads.'
      ]
    },
    ru: {
      'Иерархия ИИ': [
        '<b>Искусственный интеллект (ИИ)</b> — общая идея машин, имитирующих интеллект человека.',
        '<b>Машинное обучение (ML)</b> — <b>подмножество</b> ИИ, которое обучается на данных без явного программирования.',
        '<b>Глубокое обучение (DL)</b> — <b>подмножество</b> ML на многослойных нейросетях для сложных закономерностей.',
        'Итого: <b>ИИ ⊃ ML ⊃ DL</b>.'
      ],
      'Пять типов машинного обучения': [
        '<b>Обучение с учителем</b> — на <b>размеченных</b> данных (вход + правильный выход) для прогноза по новым данным. Делится на <b>классификацию</b> (дискретные категории — спам/не спам) и <b>регрессию</b> (непрерывные значения — цена дома).',
        '<b>Обучение без учителя</b> — ищет закономерности в <b>неразмеченных</b> данных; основной метод — <b>кластеризация</b> (группировка по сходству), также снижение размерности и анализ корзины покупок.',
        '<b>Обучение с подкреплением</b> — <b>агент</b> учится методом проб и ошибок, получая <b>награды</b> за хорошие действия и <b>штрафы</b> за плохие (робототехника, игры, рекомендации).',
        '<b>Глубокое обучение</b> — глубокие нейросети (CNN для изображений, RNN/трансформеры для последовательностей) для сложных задач зрения и языка.',
        '<b>Перенос обучения (transfer)</b> — повторное использование модели, обученной на одной задаче, как старт для похожей; экономит время и данные.'
      ],
      'Аппаратное обеспечение для ML': [
        '<b>GPU</b> — массовый параллелизм; идеален для обучения нейросетей.',
        '<b>ASIC</b> — заказная микросхема под одну задачу; максимум скорости/эффективности, но негибкая (например, высокочастотный трейдинг, где важны микросекунды).',
        '<b>FPGA</b> — перепрограммируемое железо; гибкое, но медленнее специализированного ASIC.',
        '<b>TPU</b> — тензорный процессор Google под задачи ML.'
      ]
    }
  },

  a4_2: {
    title: { en: 'A4.2 Data preprocessing (HL)', ru: 'A4.2 Предобработка данных (HL)' },
    en: {
      'Why preprocess': [
        'Preprocessing improves data quality <b>before</b> training — <b>good data = good predictions</b> ("garbage in, garbage out").',
        'Raw data contains errors, missing values, duplicates and noise; a model would learn all of that and produce unreliable predictions.'
      ],
      'Data cleaning': [
        'Make data consistent, accurate and error-free:',
        '• Correct invalid values (e.g. negative age).',
        '• Handle missing data (drop rows, impute mean/median, predict the value).',
        '• Remove duplicates.',
        '• Standardise formats (dates → YYYY-MM-DD, units, capitalisation).',
        '"Noise" = irrelevant or inaccurate data that distracts the model.'
      ],
      'Outliers': [
        'Data points that deviate significantly from the rest.',
        '<b>Z-score</b> — flag values lying beyond about <b>3 standard deviations</b> from the mean.',
        '<b>IQR method</b> — flag values outside <b>1.5 × IQR</b> below Q1 or above Q3.',
        'Decide carefully whether to remove them — sometimes outliers are the most interesting data (fraud detection!).'
      ],
      'Feature selection': [
        'Choose the most relevant input variables and remove irrelevant/redundant ones → improves accuracy and reduces computational cost.',
        '<b>Filter methods</b> — evaluate features with statistical tests <b>independently of the model</b>; fast and cheap.',
        '<b>Wrapper methods</b> — evaluate subsets by actually training the model and comparing performance; more accurate but computationally expensive.'
      ],
      'Dimensionality reduction': [
        'Reduce the number of variables (e.g. with <b>PCA</b> — Principal Component Analysis).',
        '<b>Why:</b> simplifies the model, speeds up training, helps avoid the <b>"curse of dimensionality"</b> and overfitting, while preserving important trends.'
      ]
    },
    ru: {
      'Зачем предобрабатывать': [
        'Предобработка повышает качество данных <b>до</b> обучения — <b>хорошие данные = хорошие прогнозы</b> («мусор на входе — мусор на выходе»).',
        'Сырые данные содержат ошибки, пропуски, дубли и шум; модель выучит всё это и даст ненадёжные прогнозы.'
      ],
      'Очистка данных': [
        'Привести данные к согласованному, точному, безошибочному виду:',
        '• Исправить неверные значения (например, отрицательный возраст).',
        '• Обработать пропуски (удалить строки, подставить среднее/медиану, предсказать значение).',
        '• Удалить дубли.',
        '• Стандартизировать форматы (даты → ГГГГ-ММ-ДД, единицы измерения, регистр).',
        '«Шум» — нерелевантные или неточные данные, отвлекающие модель.'
      ],
      'Выбросы (outliers)': [
        'Точки, сильно отклоняющиеся от остальных.',
        '<b>Z-оценка</b> — значения дальше ~3 стандартных отклонений от среднего.',
        '<b>Метод IQR</b> — значения за пределами <b>1,5 × IQR</b> ниже Q1 или выше Q3.',
        'Решайте аккуратно, удалять ли — иногда выбросы и есть самое интересное (например, обнаружение мошенничества!).'
      ],
      'Отбор признаков': [
        'Выбор самых значимых входов и удаление лишних/избыточных → повышает точность и снижает вычислительные затраты.',
        '<b>Фильтрующие методы</b> — оценивают признаки статистически <b>независимо от модели</b>; быстро и дёшево.',
        '<b>Обёрточные (wrapper)</b> — проверяют подмножества, реально обучая модель и сравнивая результат; точнее, но дорого.'
      ],
      'Снижение размерности': [
        'Уменьшить число переменных (например, <b>PCA</b> — метод главных компонент).',
        '<b>Зачем:</b> упрощает модель, ускоряет обучение, помогает избежать <b>«проклятия размерности»</b> и переобучения, сохраняя важные тренды.'
      ]
    }
  },

  a4_3: {
    title: { en: 'A4.3 Machine-learning approaches (HL)', ru: 'A4.3 Подходы машинного обучения (HL)' },
    en: {
      'Supervised techniques': [
        '<b>Linear regression</b> — models the relationship between a dependent variable and one or more independent variables, fitting a <b>line of best fit</b> (minimising squared error) to predict <b>continuous</b> outcomes (house prices from size/location).',
        '<b>Classification</b> — supervised technique predicting <b>discrete</b> categories (spam/ham, disease/no disease).',
        '<b>K-nearest neighbours (KNN)</b> — classifies a new point by the majority label of its <i>k</i> closest training points.',
        '<b>Decision trees / random forests</b> — split data on features to reach a class or value; forests average many trees for robustness.',
        '<b>Hyperparameter tuning</b> — settings fixed <b>before</b> training (learning rate, number of clusters <i>k</i>, tree depth) that the model cannot learn from data. Good tuning improves accuracy, efficiency and robustness. Models are compared using <b>accuracy, precision, recall and F1-score</b> from a <b>confusion matrix</b>.'
      ],
      'Unsupervised techniques': [
        '<b>K-means clustering</b> — unsupervised; partitions data into <i>k</i> clusters by assigning each point to the nearest <b>centroid</b> (mean position), then re-computing centroids — repeat until stable.',
        '<b>Association rule learning</b> — finds relationships between attributes in large datasets (market-basket analysis: "people who buy X also buy Y").',
        '<b>Dimensionality reduction</b> — PCA, t-SNE for visualisation.'
      ],
      'Reinforcement learning': [
        'An <b>agent</b> interacts with an <b>environment</b>, taking actions and observing the resulting state.',
        'It receives <b>rewards</b> for good actions and <b>penalties</b> for bad ones, and adjusts its policy to <b>maximise cumulative reward</b>.',
        'Key tension: <b>exploration</b> (try new actions) vs <b>exploitation</b> (use what already works).',
        'Used in robotics, game-playing (AlphaGo), recommendation systems.'
      ],
      'Genetic algorithms': [
        'Optimisation/search heuristics inspired by <b>natural selection</b>.',
        'A population of candidate solutions evolves over generations through <b>selection, crossover and mutation</b> to find an optimal solution.',
        'Useful where the search space is huge and gradients aren\'t available.'
      ],
      'Neural networks & CNNs': [
        'An <b>artificial neural network (ANN)</b> has input, hidden and output layers of weighted neurons that model complex patterns; trained with backpropagation.',
        '<b>CNN (Convolutional Neural Network)</b> — applies learnable <b>convolutional layers</b> (filters) that slide across the image to detect features such as edges.',
        '<b>Pooling layers</b> downsample to reduce size and keep key features.',
        'Stacking these layers lets the network learn <b>spatial hierarchies</b> — from simple edges to complex shapes, faces, objects.'
      ]
    },
    ru: {
      'Обучение с учителем': [
        '<b>Линейная регрессия</b> — моделирует связь зависимой переменной с одной/несколькими независимыми, подбирая <b>линию наилучшего соответствия</b> (минимум квадратичной ошибки) для прогноза <b>непрерывных</b> значений (цена дома по площади/району).',
        '<b>Классификация</b> — обучение с учителем для предсказания <b>дискретных</b> категорий (спам/не спам, болезнь/нет).',
        '<b>k-ближайших соседей (KNN)</b> — относит новую точку к категории большинства её <i>k</i> ближайших соседей из обучающего множества.',
        '<b>Деревья решений / случайные леса</b> — разделяют данные по признакам до класса/значения; лес усредняет много деревьев для устойчивости.',
        '<b>Настройка гиперпараметров</b> — настройки, заданные <b>до</b> обучения (скорость обучения, число кластеров <i>k</i>, глубина дерева), которые модель не выводит из данных. Хорошая настройка повышает точность, эффективность, устойчивость. Модели сравнивают по <b>accuracy, precision, recall, F1</b> из <b>матрицы ошибок</b>.'
      ],
      'Обучение без учителя': [
        '<b>Кластеризация K-means</b> — без учителя; делит данные на <i>k</i> кластеров, относя точку к ближайшему <b>центроиду</b> (среднее положение), пересчитывает центроиды — повторяет до стабильности.',
        '<b>Ассоциативные правила</b> — находят связи между атрибутами в больших данных (анализ корзины: «кто покупает X, берёт и Y»).',
        '<b>Снижение размерности</b> — PCA, t-SNE для визуализации.'
      ],
      'Обучение с подкреплением': [
        '<b>Агент</b> взаимодействует со <b>средой</b>: совершает действия и видит результат.',
        'Получает <b>награды</b> за хорошие действия и <b>штрафы</b> за плохие; со временем меняет стратегию, максимизируя <b>суммарную награду</b>.',
        'Ключевое противоречие: <b>исследование</b> (пробовать новое) против <b>эксплуатации</b> (использовать проверенное).',
        'Применяется в робототехнике, играх (AlphaGo), рекомендациях.'
      ],
      'Генетические алгоритмы': [
        'Эвристики оптимизации по принципу <b>естественного отбора</b>.',
        'Популяция решений эволюционирует через поколения с помощью <b>селекции, скрещивания и мутации</b>, ища оптимум.',
        'Полезно там, где пространство поиска огромно, а градиента нет.'
      ],
      'Нейросети и CNN': [
        '<b>Искусственная нейросеть (ИНС)</b> — входной, скрытые и выходной слои взвешенных нейронов; моделирует сложные закономерности; обучается обратным распространением.',
        '<b>CNN (свёрточная нейросеть)</b> — применяет обучаемые <b>свёрточные слои</b> (фильтры), скользящие по изображению, чтобы выявить признаки вроде граней.',
        '<b>Слои пулинга</b> уменьшают размер, сохраняя ключевые признаки.',
        'Стек этих слоёв учит <b>пространственные иерархии</b> — от простых граней к сложным формам, лицам, объектам.'
      ]
    }
  },

  a4_4: {
    title: { en: 'A4.4 Ethical considerations & NLP', ru: 'A4.4 Этика и NLP' },
    en: {
      'Accountability': [
        'When an AI system causes harm, <b>who is responsible</b>: the developer, the user, or the deployer?',
        'Clear lines of accountability are essential for decisions affecting people\'s lives — lending, hiring, medical, criminal justice.'
      ],
      'Algorithmic fairness & bias': [
        'A model inherits bias from its <b>training data</b>. If the data reflects historical prejudice or is unrepresentative, the system produces <b>discriminatory outcomes</b> in hiring, lending or justice.',
        '<b>Mitigation:</b> diverse training data, diverse teams reviewing the model, ongoing fairness testing, transparency about how the model is used.'
      ],
      'Privacy, consent & surveillance': [
        '<b>Privacy & consent</b> — ML often uses personal data, so <b>informed consent</b> and anonymisation matter, especially in health, finance and education.',
        '<b>Surveillance</b> — facial recognition in public raises concerns over lack of consent and a "<b>chilling effect</b>" on free movement and expression.',
        'Even encrypted communications leak <b>metadata</b> (who, when, how often) that unsupervised clustering can use to profile social groups.'
      ],
      'Environmental impact': [
        'Training large models consumes <b>significant energy and water</b> (for cooling).',
        'Inference at scale also has a real-world footprint — the more popular the model, the larger.',
        'Trade-off: model size & accuracy vs efficiency.'
      ],
      'Natural Language Processing (NLP)': [
        '<b>NLP</b> is a branch of AI that enables machines to <b>understand and process human text and speech</b> (chatbots, translation, search, summarisation).',
        '<b>Sarcasm and ambiguity</b> — a model must use <b>context</b> to interpret tone; otherwise it misjudges intent and may misclassify ironic language as genuine bullying (false positive) or miss disguised abuse (false negative).'
      ],
      'False positives vs false negatives': [
        '<b>False positive</b> — flags something that is not actually there (a harmless post marked as bullying). Hurts user trust; affects innocent users.',
        '<b>False negative</b> — misses a real event (failing to predict a storm; missing genuine cyberbullying). Often <b>life-and-death consequences</b>.',
        'Choosing thresholds is an ethical decision — which type of error is worse in this context?'
      ]
    },
    ru: {
      'Ответственность': [
        'Когда ИИ-система причиняет вред, <b>кто отвечает</b>: разработчик, пользователь или внедривший?',
        'Чёткие границы ответственности нужны для решений, затрагивающих жизнь людей — кредиты, найм, медицина, правосудие.'
      ],
      'Справедливость и предвзятость': [
        'Модель наследует смещение из <b>обучающих данных</b>. Если они отражают прошлые предубеждения или непредставительны, система даёт <b>дискриминационные результаты</b> в найме, кредитовании, правосудии.',
        '<b>Снижение:</b> разнообразные обучающие данные, разнообразные команды, постоянное тестирование на справедливость, прозрачность использования.'
      ],
      'Приватность, согласие, слежка': [
        '<b>Приватность и согласие</b> — ML часто использует персональные данные, поэтому важны <b>информированное согласие</b> и анонимизация, особенно в медицине, финансах, образовании.',
        '<b>Слежка</b> — распознавание лиц в общественных местах вызывает вопросы об отсутствии согласия и <b>«сдерживающем эффекте»</b> на свободу передвижения и слова.',
        'Даже шифрованные сообщения раскрывают <b>метаданные</b> (кто, когда, как часто), по которым кластеризация без учителя профилирует социальные группы.'
      ],
      'Экологический след': [
        'Обучение больших моделей потребляет <b>много энергии и воды</b> (на охлаждение).',
        'Массовая инференция тоже имеет реальный след — чем популярнее модель, тем больше.',
        'Компромисс: размер и точность модели против эффективности.'
      ],
      'Обработка естественного языка (NLP)': [
        '<b>NLP</b> — раздел ИИ, позволяющий машинам <b>понимать и обрабатывать человеческий текст и речь</b> (чат-боты, перевод, поиск, реферирование).',
        '<b>Сарказм и неоднозначность</b> — модель должна учитывать <b>контекст</b> для интерпретации тона; иначе примет иронию за настоящую травлю (ложноположительный) или пропустит скрытую агрессию (ложноотрицательный).'
      ],
      'Ложноположительные и ложноотрицательные': [
        '<b>Ложноположительный</b> — отмечает то, чего на самом деле нет (безобидный пост помечен как травля). Подрывает доверие; страдают невиновные.',
        '<b>Ложноотрицательный</b> — пропускает реальное событие (не предсказал шторм; пропустил настоящий кибербуллинг). Часто <b>тяжёлые, вплоть до жизни и смерти</b>, последствия.',
        'Выбор порога — этическое решение: какая ошибка хуже в этом контексте?'
      ]
    }
  }
};
