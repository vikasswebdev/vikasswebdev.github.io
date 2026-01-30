(function () {
  'use strict';

  var IMAGE_URL = 'img/portrait.jpg';

  // Content chunks — my portfolio (order matters)
  var chunks = [
    {
      type: 'profile',
      title: '',
      html: '<div class="resume-chunk-profile">' +
        '<img src="' + IMAGE_URL + '" alt="Vikas Patel" class="resume-chunk-img" />' +
        '<div class="resume-chunk-profile-text">' +
        '<h2 class="resume-chunk-name">Vikas Patel</h2>' +
        '<p class="resume-chunk-tagline">Full Stack Engineer & AI Enthusiast</p>' +
        '<p class="resume-chunk-bio-short">I love exploring how AI can help solve real-world problems, and I\'m deep diving into AI.</p>' +
        '</div></div>'
    },
    {
      type: 'section',
      title: 'About',
      html: '<p><strong>In three words:</strong> I love to learn and build.</p>' +
        '<p>I\'m a web & app developer passionate about creating beautiful and functional digital experiences. ' +
        'I have a Bachelor\'s degree (BSC) from University College of Science, MLSU, and I\'m largely self-taught in development — YouTube, docs, and building things. ' +
        'Currently learning Python and AI-related technologies. Experienced in full-stack development with React, Node.js, TypeScript, and modern frameworks.</p>'
    },
    {
      type: 'section',
      title: 'Experience',
      html: '<ul class="resume-list">' +
        '<li><strong>Software Developer</strong> — ContractFlo Technologies (Aug 2023 – Present) · Full-time, Remote · Node.js, TypeScript</li>' +
        '<li><strong>Full Stack Engineer</strong> — codeoflyf (Jul 2023 – Present) · Self-employed, Udaipur · React.js, React Native, Node.js, Express.js</li>' +
        '<li><strong>Building for client</strong> — <a href="http://godaamse.com/" target="_blank" rel="noopener">GodaamSe</a> (Present) · The Ultimate Online Store for Shopkeepers — wholesale sourcing, inventory & doorstep delivery for Kirana stores</li>' +
        '<li><strong>React Developer</strong> — NextEdge Digital (Jul 2021 – Jul 2023) · Full-time · Tailwind CSS, Node.js</li>' +
        '<li><strong>React Developer</strong> — Freelance (Feb–Mar 2023) · Remote · TypeScript, React.js</li>' +
        '</ul>'
    },
    {
      type: 'section',
      title: 'Skills & Tech Stack',
      html: '<ul class="resume-list">' +
        '<li>Frontend: React, React Native, TypeScript, HTML/CSS, Tailwind CSS</li>' +
        '<li>Backend: Node.js, Express.js</li>' +
        '<li>Currently learning: Python and AI-related technologies</li>' +
        '</ul>'
    },
    {
      type: 'section',
      title: 'Projects',
      html: '<p><strong>MyVCCircle</strong> — An all-in-one personal finance companion: group savings, expense tracking, rent assistant, goal planner, and an AI-powered Finance Coach.</p>' +
        '<p><a href="https://myvccircle.com" target="_blank" rel="noopener">Visit Website</a> · ' +
        '<a href="https://www.producthunt.com/posts/myvccircle" target="_blank" rel="noopener">Product Hunt</a></p>' +
        '<p><strong>GodaamSe</strong> — The Ultimate Online Store for Shopkeepers. Client project: digital wholesale sourcing, smart inventory & sales, doorstep delivery for Kirana stores. <a href="http://godaamse.com/" target="_blank" rel="noopener">godaamse.com</a></p>'
    },
    {
      type: 'section',
      title: 'Connect',
      html: '<p><a href="https://www.linkedin.com/in/vikaswebdev/" target="_blank" rel="noopener">LinkedIn</a> · ' +
        '<a href="https://github.com/vikasswebdev" target="_blank" rel="noopener">GitHub</a> · ' +
        '<a href="https://x.com/vikaas_ai" target="_blank" rel="noopener">X</a> · ' +
        '<a href="https://www.instagram.com/techbyvikass/" target="_blank" rel="noopener">Instagram</a></p>'
    }
  ];

  var WORD_ANIMATION_MS = 45;
  var WORD_FADE_DURATION_MS = 500;

  function wrapWordsWithReveal(container, delayPerWordMs) {
    var wordIndex = 0;
    var delay = typeof delayPerWordMs === 'number' ? delayPerWordMs : WORD_ANIMATION_MS;
    var textNodes = [];
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(function (textNode) {
      var text = textNode.textContent;
      if (!text || !text.trim()) return;
      var parts = text.split(/(\s+)/);
      var frag = document.createDocumentFragment();
      for (var i = 0; i < parts.length; i++) {
        if (/\S/.test(parts[i])) {
          var span = document.createElement('span');
          span.className = 'chunk-word';
          span.style.animationDelay = wordIndex * delay + 'ms';
          span.textContent = parts[i];
          frag.appendChild(span);
          wordIndex += 1;
        } else {
          frag.appendChild(document.createTextNode(parts[i]));
        }
      }
      textNode.parentNode.replaceChild(frag, textNode);
    });
    return wordIndex;
  }

  function addChunk(thread, chunk, index) {
    var wrap = document.createElement('div');
    wrap.className = 'resume-chunk resume-chunk--' + chunk.type + ' resume-chunk--animate';
    wrap.setAttribute('data-chunk', index);

    if (chunk.title) {
      var titleEl = document.createElement('h3');
      titleEl.className = 'resume-chunk-title';
      titleEl.textContent = chunk.title;
      wrap.appendChild(titleEl);
    }

    var body = document.createElement('div');
    body.className = 'resume-chunk-body';
    body.innerHTML = chunk.html;
    wrap.appendChild(body);

    var wordCount = wrapWordsWithReveal(body, WORD_ANIMATION_MS);

    thread.appendChild(wrap);
    requestAnimationFrame(function () {
      wrap.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    });
    return wordCount;
  }

  function addTypingIndicator(thread) {
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg chat-msg-assistant chat-typing-wrap';
    var content = document.createElement('div');
    content.className = 'chat-msg-content';
    var typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    content.appendChild(typing);
    wrap.appendChild(content);
    thread.appendChild(wrap);
    wrap.scrollIntoView({ behavior: 'smooth', block: 'end' });
    return wrap;
  }

  function removeTyping(typingEl) {
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
  }

  function addNewChatButton(thread) {
    var wrap = document.createElement('div');
    wrap.className = 'new-chat-wrap';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'new-chat-btn';
    btn.innerHTML = '<i class="fas fa-plus"></i> New chat';
    btn.setAttribute('aria-label', 'Start new chat');
    btn.addEventListener('click', function () {
      var hero = document.getElementById('chat-hero');
      var threadEl = document.getElementById('chat-thread');
      var input = document.getElementById('resume-search');
      if (hero) hero.classList.remove('hidden-hero');
      if (threadEl) {
        threadEl.classList.remove('has-messages');
        threadEl.innerHTML = '';
      }
      if (input) {
        input.value = '';
        input.placeholder = 'Explore my portfolio';
      }
    });
    wrap.appendChild(btn);
    thread.appendChild(wrap);
    requestAnimationFrame(function () {
      wrap.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    });
  }

  function showAllChunks(thread) {
    var typingEl = addTypingIndicator(thread);
    var index = 0;

    function showNext() {
      if (index === 0) removeTyping(typingEl);
      if (index >= chunks.length) {
        addNewChatButton(thread);
        return;
      }
      var wordCount = addChunk(thread, chunks[index], index);
      index += 1;
      var waitMs = wordCount * WORD_ANIMATION_MS + WORD_FADE_DURATION_MS + 300;
      setTimeout(showNext, Math.max(waitMs, 800));
    }

    setTimeout(showNext, 400);
  }

  function runSearch(query) {
    query = (typeof query === 'string') ? query.trim() : '';
    var hero = document.getElementById('chat-hero');
    var thread = document.getElementById('chat-thread');
    var input = document.getElementById('resume-search');

    hero.classList.add('hidden-hero');
    thread.classList.add('has-messages');
    thread.innerHTML = '';

    var userMsg = document.createElement('div');
    userMsg.className = 'chat-msg chat-msg-user';
    var userContent = document.createElement('div');
    userContent.className = 'chat-msg-content';
    var userLabel = document.createElement('div');
    userLabel.className = 'chat-msg-label';
    userLabel.textContent = 'You';
    var userText = document.createElement('div');
    userText.className = 'chat-msg-text';
    userText.textContent = query || 'What do people like to know about me?';
    userContent.appendChild(userLabel);
    userContent.appendChild(userText);
    userMsg.appendChild(userContent);
    thread.appendChild(userMsg);

    if (input) input.value = '';

    showAllChunks(thread);
  }

  function init() {
    var input = document.getElementById('resume-search');
    var btn = document.getElementById('resume-search-btn');

    function submit() {
      runSearch(input ? input.value : '');
    }

    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          submit();
        }
      });
    }
    if (btn) btn.addEventListener('click', submit);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
