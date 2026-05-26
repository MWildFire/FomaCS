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
  a2_1: {
    title: { en: 'A2.1 Network fundamentals', ru: 'A2.1 Основы сетей' },
    en: {
      'Types of network': [
        '<b>LAN</b> (Local Area Network) — short distance (~1 km), high speed, low latency. Examples: school, office.',
        '<b>WAN</b> (Wide Area Network) — cities, countries, continents. Joins many LANs. Slower than LAN.',
        '<b>PAN</b> (Personal Area Network) — ~10 m, Bluetooth/Wi-Fi Direct (phone ↔ smartwatch).',
        '<b>VPN</b> (Virtual Private Network) — encrypted tunnel over the public internet; cheap secure remote access.'
      ],
      'Modern infrastructure': [
        '<b>Internet</b> — global network using standardized protocols (WWW runs on HTTP).',
        '<b>Cloud</b> — on-demand remote servers; scalable but needs connectivity and raises data-sovereignty concerns.',
        '<b>Distributed system</b> — many nodes acting as one. More power & fault tolerance, harder consistency.',
        '<b>Edge computing</b> — processing near the source. Lower latency; harder to secure many devices.',
        '<b>Mobile (2G→5G)</b> — convenient but dead zones, congestion, security risks.'
      ],
      'Devices': [
        '<b>Router</b> — forwards packets <b>between</b> networks by IP (Network layer).',
        '<b>Switch</b> — forwards frames <b>within</b> one LAN by MAC (Data-Link layer). Hubs broadcast → collisions.',
        '<b>Modem</b> — modulates/demodulates digital ↔ analogue for the ISP line.',
        '<b>NIC</b> — network interface card; holds the 48-bit MAC address.',
        '<b>Gateway</b> — bridges networks with different protocols (e.g. NAT).',
        '<b>Firewall</b> — filters traffic against rules.'
      ],
      'Protocols & TCP/IP model': [
        '<b>TCP</b> — connection-oriented; acks, sequencing, retransmission → reliable.',
        '<b>UDP</b> — connectionless; no delivery guarantee, but faster (streaming/VoIP).',
        '<b>HTTP/HTTPS, SMTP, FTP, DNS, DHCP</b> — application-layer protocols.',
        '<b>Port number</b> — identifies a service on a host (HTTP 80, HTTPS 443).',
        '<b>4 layers:</b> Application · Transport · Internet · Network Access. Data is encapsulated going down, de-encapsulated going up.'
      ]
    },
    ru: {
      'Типы сетей': [
        '<b>LAN</b> (локальная) — до ~1 км, высокая скорость, низкая задержка. Школа, офис.',
        '<b>WAN</b> (глобальная) — города, страны, континенты. Объединяет много LAN.',
        '<b>PAN</b> (персональная) — ~10 м, Bluetooth/Wi-Fi Direct (телефон ↔ часы).',
        '<b>VPN</b> — шифрованный туннель через публичный интернет; безопасный удалённый доступ.'
      ],
      'Современная инфраструктура': [
        '<b>Интернет</b> — глобальная сеть по стандартным протоколам (WWW поверх HTTP).',
        '<b>Облако</b> — доступ по требованию к удалённым серверам; нужна связь, вопросы суверенитета данных.',
        '<b>Распределённая система</b> — много узлов как одно целое. Больше отказоустойчивости, сложнее согласованность.',
        '<b>Edge</b> — обработка рядом с источником. Низкая задержка; сложнее защищать.',
        '<b>Мобильные сети (2G→5G)</b> — удобно, но «мёртвые зоны», заторы, риски безопасности.'
      ],
      'Устройства': [
        '<b>Маршрутизатор</b> — пакеты <b>между</b> сетями по IP (сетевой уровень).',
        '<b>Коммутатор</b> — кадры <b>внутри</b> LAN по MAC (канальный уровень). Хаб рассылает → коллизии.',
        '<b>Модем</b> — модулирует/демодулирует цифра ↔ аналог для линии провайдера.',
        '<b>Сетевая карта (NIC)</b> — хранит 48-битный MAC.',
        '<b>Шлюз</b> — соединяет сети с разными протоколами (напр. NAT).',
        '<b>Файрвол</b> — фильтрует трафик по правилам.'
      ],
      'Протоколы и TCP/IP': [
        '<b>TCP</b> — с соединением; подтверждения, порядок, повтор → надёжно.',
        '<b>UDP</b> — без соединения; без гарантий, зато быстрее (стриминг/VoIP).',
        '<b>HTTP/HTTPS, SMTP, FTP, DNS, DHCP</b> — прикладные протоколы.',
        '<b>Порт</b> — идентификатор сервиса (HTTP 80, HTTPS 443).',
        '<b>4 уровня:</b> прикладной · транспортный · межсетевой · сетевого доступа. Данные инкапсулируются вниз и разбираются вверх.'
      ]
    }
  },

  a2_2: {
    title: { en: 'A2.2 Network architecture & topologies', ru: 'A2.2 Архитектура и топологии' },
    en: {
      'Topologies': [
        '<b>Star</b> — every device → central switch. Easy to scale, but the centre is a single point of failure.',
        '<b>Mesh</b> — nodes connect to many others; very high redundancy, no single point of failure, but expensive.',
        '<b>Hybrid</b> — mixes topologies (star core + mesh edge) — balance of cost, speed and resilience.'
      ],
      'Servers & models': [
        '<b>Server types:</b> DNS, DHCP, web, mail, file, print.',
        '<b>Client-Server</b> — central server provides resources. Easier to administer, but a single point of failure.',
        '<b>Peer-to-Peer (P2P)</b> — every node is client + server. Decentralised; scales naturally; harder to secure. Used for blockchain, file-sharing.'
      ],
      'Segmentation': [
        '<b>VLAN</b> — Layer-2 logical grouping on switches; isolates traffic regardless of physical location.',
        '<b>Subnetting</b> — Layer-3 division of IP space into sub-networks.'
      ]
    },
    ru: {
      'Топологии': [
        '<b>Звезда</b> — все устройства → центральный коммутатор. Легко масштабируется, но центр = единая точка отказа.',
        '<b>Mesh</b> — узлы связаны со многими; очень надёжна, нет единой точки отказа, но дорого.',
        '<b>Гибрид</b> — ядро-звезда + край-mesh — баланс цены, скорости и устойчивости.'
      ],
      'Серверы и модели': [
        '<b>Виды серверов:</b> DNS, DHCP, веб, почтовый, файловый, принт.',
        '<b>Клиент-сервер</b> — центральный сервер выдаёт ресурсы. Проще управление, но единая точка отказа.',
        '<b>P2P</b> — каждый узел и клиент, и сервер. Децентрализована, сама масштабируется, сложнее защищать. Блокчейн, файлообмен.'
      ],
      'Сегментация': [
        '<b>VLAN</b> — логическое разделение на 2-м уровне; изолирует трафик независимо от размещения.',
        '<b>Подсети</b> — деление пространства IP на 3-м уровне.'
      ]
    }
  },

  a2_3: {
    title: { en: 'A2.3 Data transmission & security', ru: 'A2.3 Передача и безопасность' },
    en: {
      'IP & media': [
        '<b>IPv4</b> 32-bit (~4.3B addresses). <b>IPv6</b> 128-bit (~3.4×10³⁸).',
        '<b>NAT</b> lets many private devices share one public IP, conserving IPv4 and hiding internal hosts.',
        '<b>Media:</b> twisted pair (cheap, short), coaxial (better shielded), fibre (very fast, EMI-immune, fragile), wireless (mobile, more interference).'
      ],
      'Packets & routing': [
        '<b>Packet switching</b> — data split into packets with header (src/dst IP, sequence); independent paths, reassembled at destination.',
        '<b>Static routing</b> — manual, fixed routes. <b>Dynamic routing</b> — routers exchange info, adapt to congestion/failure.'
      ],
      'Security': [
        '<b>Firewall</b> — filters by rules. Vulnerable to insider threats, costly to configure deeply.',
        '<b>Threats:</b> DDoS, malware, phishing, MitM, SQL injection.',
        '<b>Encryption</b> — symmetric (one shared key, fast) vs asymmetric (public/private pair, secure key exchange).',
        '<b>Digital certificates</b> — issued by CAs; bind a server to a public key (makes HTTPS trustworthy).'
      ]
    },
    ru: {
      'IP и среды': [
        '<b>IPv4</b> 32-битный (~4,3 млрд). <b>IPv6</b> 128-битный (~3,4×10³⁸).',
        '<b>NAT</b> — много частных устройств за одним публичным IP; экономит IPv4 и скрывает хосты.',
        '<b>Среды:</b> витая пара (дёшево, короткое), коаксиал (лучше экранирование), оптоволокно (быстро, без EMI, хрупко), беспроводная (мобильно, помехи).'
      ],
      'Пакеты и маршрутизация': [
        '<b>Коммутация пакетов</b> — данные делятся на пакеты с заголовком (src/dst IP, номер последовательности); идут независимо, собираются в получателе.',
        '<b>Статическая</b> — маршруты заданы вручную. <b>Динамическая</b> — роутеры обмениваются и сами подстраиваются под заторы/отказы.'
      ],
      'Безопасность': [
        '<b>Файрвол</b> — фильтрует по правилам. Слаб против инсайдеров, дорог в глубокой настройке.',
        '<b>Угрозы:</b> DDoS, вредоносное ПО, фишинг, «человек посередине», SQL-инъекция.',
        '<b>Шифрование</b> — симметричное (один ключ, быстро) vs асимметричное (пара ключей, безопасный обмен).',
        '<b>Сертификаты</b> — выдаются CA; связывают сервер с открытым ключом (делают HTTPS доверенным).'
      ]
    }
  },

  a3_1: {
    title: { en: 'A3.1 Database fundamentals', ru: 'A3.1 Основы БД' },
    en: {
      'Core terms': [
        '<b>Database</b> — an organised collection of data stored and accessed electronically.',
        '<b>Entity = table</b>, <b>tuple = record/row</b>, <b>attribute = column</b>.',
        '<b>Primary key</b> — uniquely identifies a record. <b>Foreign key</b> — refers to another table\'s primary key.',
        '<b>Referential integrity</b> — every foreign key must point to a valid existing primary key.'
      ],
      'Relationships & limits': [
        '<b>1:1, 1:M, M:N</b>. M:N must be resolved with a <b>junction/link table</b> (e.g. Appointment).',
        '<b>Flat-file problems</b>: insert / delete / update anomalies → fixed by normalization.',
        '<b>Relational limits</b>: rigid schema fits poorly with unstructured media; object-relational mismatch for complex OOP.'
      ]
    },
    ru: {
      'Базовые термины': [
        '<b>База данных</b> — организованная коллекция данных, доступная электронно.',
        '<b>Сущность = таблица</b>, <b>кортеж = запись/строка</b>, <b>атрибут = столбец</b>.',
        '<b>Первичный ключ</b> — однозначно идентифицирует запись. <b>Внешний</b> — ссылается на первичный другой таблицы.',
        '<b>Ссылочная целостность</b> — внешний ключ всегда указывает на существующий первичный.'
      ],
      'Связи и ограничения': [
        '<b>1:1, 1:M, M:N</b>. M:N разрешается через <b>связующую таблицу</b> (напр. «Приём»).',
        '<b>Аномалии плоского файла:</b> вставка / удаление / обновление → решает нормализация.',
        '<b>Ограничения реляционной модели:</b> жёсткая схема плохо подходит для неструктурированных данных; mismatch со сложными OOP-структурами.'
      ]
    }
  },

  a3_2: {
    title: { en: 'A3.2 Design & normalization', ru: 'A3.2 Проектирование и нормализация' },
    en: {
      'Schemas & ERD': [
        '<b>Schema</b> — blueprint without data. <b>Conceptual</b> (abstract), <b>logical</b> (attributes + keys), <b>physical</b> (data types, indices).',
        '<b>ERD</b> — entities (rectangles), attributes, relationships (verbs), cardinality (1, M, N).'
      ],
      'Normal forms': [
        '<b>1NF</b> — atomic values, no repeating groups.',
        '<b>2NF</b> — 1NF + no <b>partial dependency</b> (non-key attribute depends on whole composite key).',
        '<b>3NF</b> — 2NF + no <b>transitive dependency</b> (non-key doesn\'t depend on another non-key).',
        '<b>Denormalization</b> — deliberately add redundancy for read speed; costs storage + risk of update anomalies.'
      ]
    },
    ru: {
      'Схемы и ERD': [
        '<b>Схема</b> — план без данных. <b>Концептуальная</b> (абстрактная), <b>логическая</b> (атрибуты + ключи), <b>физическая</b> (типы, индексы).',
        '<b>ERD</b> — сущности (прямоугольники), атрибуты, связи (глаголы), кардинальность (1, M, N).'
      ],
      'Нормальные формы': [
        '<b>1НФ</b> — атомарные значения, нет повторяющихся групп.',
        '<b>2НФ</b> — 1НФ + нет <b>частичной зависимости</b> (неключевой зависит от всего составного ключа).',
        '<b>3НФ</b> — 2НФ + нет <b>транзитивной зависимости</b> (неключевой не зависит от другого неключевого).',
        '<b>Денормализация</b> — намеренно вводят избыточность ради скорости чтения; ценой места и риска аномалий обновления.'
      ]
    }
  },

  a3_3: {
    title: { en: 'A3.3 SQL programming', ru: 'A3.3 Программирование SQL' },
    en: {
      'SQL families': [
        '<b>DDL</b> — defines structure: CREATE, ALTER, DROP.',
        '<b>DML</b> — manipulates data: SELECT, INSERT, UPDATE, DELETE.',
        '<b>DCL</b> — controls access: GRANT, REVOKE.',
        '<b>TCL</b> (HL) — transaction control: COMMIT, ROLLBACK.'
      ],
      'Querying': [
        '<b>SELECT … FROM … WHERE …</b> with <b>JOIN ON</b> matching FK to PK.',
        'WHERE is critical in UPDATE/DELETE — without it, <b>every row</b> is affected.',
        '<b>Aggregates:</b> SUM, AVG, COUNT, MIN, MAX (often with GROUP BY).',
        '<b>Views (HL)</b> — virtual tables from a stored query; data not stored separately.',
        '<b>Transactions (HL)</b> — atomic "all or nothing"; ROLLBACK reverts to last COMMIT (ACID).'
      ]
    },
    ru: {
      'Семейства SQL': [
        '<b>DDL</b> — структура: CREATE, ALTER, DROP.',
        '<b>DML</b> — данные: SELECT, INSERT, UPDATE, DELETE.',
        '<b>DCL</b> — доступ: GRANT, REVOKE.',
        '<b>TCL</b> (HL) — транзакции: COMMIT, ROLLBACK.'
      ],
      'Запросы': [
        '<b>SELECT … FROM … WHERE …</b> с <b>JOIN ON</b>, связывая внешний и первичный ключи.',
        'WHERE критичен в UPDATE/DELETE — без него меняются/удаляются <b>все строки</b>.',
        '<b>Агрегаты:</b> SUM, AVG, COUNT, MIN, MAX (часто с GROUP BY).',
        '<b>Views (HL)</b> — виртуальная таблица из сохранённого запроса; отдельно не хранится.',
        '<b>Транзакции (HL)</b> — атомарность «всё или ничего»; ROLLBACK возвращает к последнему COMMIT (ACID).'
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
    title: { en: 'A4.1 ML fundamentals', ru: 'A4.1 Основы ML' },
    en: {
      'AI hierarchy': [
        'AI ⊃ ML ⊃ DL.',
        '<b>AI</b> — broad concept (machines imitating intelligence).',
        '<b>ML</b> — learns from data without being explicitly programmed.',
        '<b>Deep Learning</b> — multi-layer neural networks for complex patterns.'
      ],
      'Five types of ML': [
        '<b>Supervised</b> — labelled data. Split into <b>classification</b> (discrete) and <b>regression</b> (continuous).',
        '<b>Unsupervised</b> — unlabelled; main method <b>clustering</b>.',
        '<b>Reinforcement</b> — agent learns by trial/error from rewards and penalties.',
        '<b>Deep learning</b> — deep neural nets (CNNs, RNNs).',
        '<b>Transfer learning</b> — reuse a trained model on a related task.'
      ],
      'Hardware': [
        '<b>GPU</b> — massively parallel; ideal for neural-net training.',
        '<b>ASIC</b> — custom-built; highest speed/efficiency but inflexible (e.g. HFT).',
        '<b>FPGA</b> — reconfigurable; flexible but slower than ASIC.',
        '<b>TPU</b> — Google\'s tensor processor for ML workloads.'
      ]
    },
    ru: {
      'Иерархия ИИ': [
        'ИИ ⊃ ML ⊃ DL.',
        '<b>ИИ</b> — общая идея (машины имитируют интеллект).',
        '<b>ML</b> — учится на данных без явного программирования.',
        '<b>Глубокое обучение</b> — многослойные нейросети для сложных закономерностей.'
      ],
      'Пять типов ML': [
        '<b>С учителем</b> — размеченные данные. Делится на <b>классификацию</b> (дискретное) и <b>регрессию</b> (непрерывное).',
        '<b>Без учителя</b> — неразмеченные данные; основной метод — <b>кластеризация</b>.',
        '<b>С подкреплением</b> — агент учится методом проб и ошибок по наградам/штрафам.',
        '<b>Глубокое</b> — глубокие нейросети (CNN, RNN).',
        '<b>Перенос обучения</b> — переиспользование обученной модели на похожей задаче.'
      ],
      'Аппаратное обеспечение': [
        '<b>GPU</b> — массовый параллелизм; идеально для нейросетей.',
        '<b>ASIC</b> — заказная микросхема; максимум скорости/эффективности, но негибкая (HFT).',
        '<b>FPGA</b> — перепрограммируемая; гибкая, но медленнее ASIC.',
        '<b>TPU</b> — тензорный процессор Google для задач ML.'
      ]
    }
  },

  a4_2: {
    title: { en: 'A4.2 Preprocessing (HL)', ru: 'A4.2 Предобработка (HL)' },
    en: {
      'Cleaning & features': [
        'Good data = good predictions ("garbage in, garbage out").',
        '<b>Data cleaning</b> — fix invalid values, missing data, duplicates, format inconsistencies.',
        '<b>Outliers</b> — points deviating significantly. Detect with <b>Z-score</b> (>~3σ) or <b>IQR</b> (>1.5×IQR).',
        '<b>Feature selection</b> — remove irrelevant/redundant features. Filter (statistical, fast) vs wrapper (train model, accurate but slow).',
        '<b>Dimensionality reduction</b> — fewer variables (e.g. PCA) → faster training, less overfitting, avoid curse of dimensionality.'
      ]
    },
    ru: {
      'Очистка и признаки': [
        'Хорошие данные = хорошие прогнозы («мусор на входе — мусор на выходе»).',
        '<b>Очистка</b> — неверные значения, пропуски, дубли, форматы.',
        '<b>Выбросы</b> — точки, значительно отклоняющиеся. Z-оценка (>~3σ) или IQR (>1,5×IQR).',
        '<b>Отбор признаков</b> — убираем нерелевантные/избыточные. Фильтр (статистика, быстро) vs обёрточный (обучая модель, точнее, но медленно).',
        '<b>Снижение размерности</b> — меньше переменных (PCA) → быстрее, меньше переобучения, избегаем «проклятия размерности».'
      ]
    }
  },

  a4_3: {
    title: { en: 'A4.3 ML approaches (HL)', ru: 'A4.3 Подходы ML (HL)' },
    en: {
      'Supervised techniques': [
        '<b>Linear regression</b> — line of best fit minimising error → predict continuous outcomes.',
        '<b>Classification</b> — predicts discrete categories.',
        '<b>Hyperparameter tuning</b> — settings fixed before training (learning rate, k, tree depth). Compare with accuracy/precision/recall/F1 from a confusion matrix.'
      ],
      'Unsupervised & beyond': [
        '<b>K-means clustering</b> — partition data into k clusters by nearest centroid.',
        '<b>Association rule learning</b> — "people who buy X also buy Y".',
        '<b>Reinforcement learning</b> — agent ↔ environment; reward/penalty; exploration vs exploitation.',
        '<b>Genetic algorithms</b> — selection, crossover, mutation; inspired by natural selection.',
        '<b>ANNs/CNNs</b> — convolutional + pooling layers learn spatial hierarchies (image pixels).'
      ]
    },
    ru: {
      'Обучение с учителем': [
        '<b>Линейная регрессия</b> — линия наилучшего соответствия (минимум ошибки) → непрерывный прогноз.',
        '<b>Классификация</b> — предсказывает дискретные категории.',
        '<b>Гиперпараметры</b> — настройки до обучения (скорость обучения, k, глубина дерева). Сравнение по accuracy/precision/recall/F1 из матрицы ошибок.'
      ],
      'Без учителя и далее': [
        '<b>K-means</b> — деление на k кластеров по ближайшему центроиду.',
        '<b>Ассоциативные правила</b> — «кто покупает X, берёт и Y».',
        '<b>RL</b> — агент ↔ среда; награды/штрафы; баланс исследования/эксплуатации.',
        '<b>Генетические алгоритмы</b> — селекция, скрещивание, мутация; принцип отбора.',
        '<b>ANN/CNN</b> — свёрточные и пулинг-слои учат пространственные иерархии (пиксели).'
      ]
    }
  },

  a4_4: {
    title: { en: 'A4.4 Ethics & NLP', ru: 'A4.4 Этика и NLP' },
    en: {
      'Ethical considerations': [
        '<b>Accountability</b> — who is responsible when AI causes harm: developer, user, deployer?',
        '<b>Bias</b> — models inherit prejudice from training data → discriminatory outcomes; mitigate with diverse data, teams, ongoing testing.',
        '<b>Privacy & consent</b> — ML often uses personal data; informed consent and anonymisation matter.',
        '<b>Surveillance</b> — facial recognition raises consent issues and "chilling effects".',
        '<b>Environment</b> — large models consume significant energy/resources.'
      ],
      'NLP': [
        'NLP — branch of AI for understanding/processing human language.',
        '<b>Sarcasm & ambiguity</b> — surface analysis misreads ironic language; context matters.',
        '<b>False positive</b> — flags something that is not there (e.g. innocent post marked bullying).',
        '<b>False negative</b> — misses a real event (e.g. missed storm forecast). Often life-and-death.'
      ]
    },
    ru: {
      'Этика': [
        '<b>Ответственность</b> — кто отвечает за вред ИИ: разработчик, пользователь, внедривший?',
        '<b>Предвзятость</b> — модель наследует смещение из обучающих данных → дискриминация; борьба: разнообразные данные, команды, тестирование.',
        '<b>Приватность и согласие</b> — ML часто использует персональные данные; важны информированное согласие и анонимизация.',
        '<b>Слежка</b> — распознавание лиц = проблемы согласия и «сдерживающий эффект».',
        '<b>Экология</b> — большие модели расходуют много энергии и ресурсов.'
      ],
      'NLP': [
        'NLP — раздел ИИ для понимания и обработки человеческого языка.',
        '<b>Сарказм и неоднозначность</b> — поверхностный анализ ошибается; нужен контекст.',
        '<b>Ложноположительный</b> — отмечает то, чего нет (безобидный пост помечен как травля).',
        '<b>Ложноотрицательный</b> — пропускает реальное событие (шторм). Может быть критично.'
      ]
    }
  }
};
