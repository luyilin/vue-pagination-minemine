import marked from 'marked'
import Prism from 'prismjs'
const toc = []
const renderer = new marked.Renderer()

/**
 * render anchor tag
 * @link https://github.com/chjj/marked#overriding-renderer-methods
 */
renderer.heading = function (text, level) {
  const slug = text.toLowerCase().replace(/<(?:.|\n)*?>/gm, '').replace(/[\s\n\t]+/g, '-')

  toc.push({ level, slug: '#' + slug, title: text })

  return `<h${level} id="${slug}"><a href="#${slug}" class="anchor"></a>${text}</h${level}>`
}

// 如何判断出 lang ? 代码块前加上语言类型并换行 e.g. ```html\n<html>```  ``` shell\n$ npm run dev```
renderer.code = function (code, lang = '') {
  const hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)

  return `<pre data-lang="${lang}"><code class="lang-${lang}">${hl}</code></pre>`
}

marked.setOptions({ renderer })

let doc = document,
    win = window,
    btnRight = 18,
    btnBottom = 10,
  getLastChild = (i)=> {
    var child = i.lastChild;
    while (child && child.nodeType!=1) {
      child = child.previousSibling;
    }
    if (child.childNodes.length === 1 && child.childNodes[0].nodeType === 3)  {
      return child
    } else {
      return getLastChild(child)
    }
  },
  changeStyle = (i)=> {
    let style = i.style;
    style.position = 'absolute';
    i.classList.remove('fix-btn');
  },
  changeFix = (i)=> {
    let style = i.style;
    style.position = 'fixed';
    addClassName(i, 'fix-btn')
  },
  addClassName = (i, ...list)=> {
    for (var j of list) {
      i.classList.add(j)
    }
  },
  getNextSibling = (i)=> {
    var j = i.nextSibling;
    while (j && j.nodeType!=1) {
      j = j.nextSibling;
    }
    return j
  }

module.exports = (function() {
  return {
    marked: marked,
    load: function(options) {
      options = Object.assign({
        url: '',
        method: 'get',
        dataType: 'html',
        baseUrl: ApiPrefix
      }, options);
      let url = options.url,
          method = options.method,
          dataType = options.dataType,
          baseUrl = options.baseUrl;
      const xhr = new XMLHttpRequest()
      xhr.open(method, baseUrl + url)
      xhr.send(null)
      return {
        then: (success, error = ()=> {})=> {
          xhr.addEventListener('error', error)
          xhr.addEventListener('load', ({ target }) => {
            let content = dataType === 'json' ? JSON.parse(target.response) : target.response
            target.status >= 400 ? error(target) : success(content)
          })
        }
      }
    },
    typing: (part1, html1, time, part2, html2)=> {
      let firstIndex = 0,
          secondIndex = 0;
      (function htmlType() {
        part1.innerHTML = html1.substr(0, firstIndex) + '<span class="typing">|</span>'
        firstIndex++
        if (html1.length >= firstIndex) {
          setTimeout(htmlType, time)
          // requestAnimationFrame(htmlType)
        } else {
          let link = part1.querySelectorAll('a')
          if (link.length) {
            link[0].setAttribute('href', 'https://github.com/luyilin')
            link[0].setAttribute('target', '_blank')
            link[1].setAttribute('href', 'mailto:luyilin12@gmail.com')
          }
          if (!part2) return
          cssType()
        }
      })()
      let cssType = ()=> {
        part2.innerHTML = html2.substr(0, secondIndex)
        secondIndex++
        if (html2.length >= secondIndex) {
          setTimeout(cssType, time)
          // requestAnimationFrame(cssType)
        } else {
          part2.setAttribute('contenteditable', true)
        }
      }
    },
    getLastChild: (i)=> {
      var child = i.lastChild;
      while (child && child.nodeType!=1) {
        child = child.previousSibling;
      }
      if (child.childNodes.length === 1 && child.childNodes[0].nodeType === 3)  {
        return child
      } else {
        return getLastChild(child)
      }
    },
    addClassName: (i, ...list)=> {
      for (var j of list) {
        i.classList.add(j)
      }
    },
    addDate: (i, title)=> {
      let date = i.indexOf('<!--date:'),
          year, month, day, essayDate
      if (date !== -1) {
        year = i.slice(date + 9, date + 13)
        month = i.slice(date + 14, date + 16)
        day = i.slice(date + 17, date + 19)
        essayDate = year + '年' + month + '月' + day + '日'
        let meta = document.createElement('p')
        meta.classList.add('meta')
        meta.innerHTML = '<i class="iconfont iconfont-essay icon-icon01"><i>'
        meta.innerHTML += '发表于 ' + essayDate
        title.parentNode.insertBefore(meta, title.nextSibling);
      }
    },
    addTitleLink: (title, url)=> {
      let link = title.firstChild,
          text = link.nextSibling
      link.setAttribute('href', '/artical-' +url)
      link.setAttribute('target', '_blank')
      link.appendChild(text)
      link.classList.add('essay-title')
    },
    changeStyle: (i)=> {
      let style = i.style;
      style.position = 'absolute';
      i.classList.remove('fix-btn');
    },
    changeFix: (i)=> {
      let style = i.style;
      style.position = 'fixed';
      addClassName(i, 'fix-btn')
    },
    onscroll: (i,j) => {
      let ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth || 0,
          h = win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight || 0,
          w = doc.documentElement.getBoundingClientRect().width || 0,
          s = win.pageYOffset || doc.body.scrollTop || doc.documentElement.scrollTop || 0,
          panel = document.getElementsByClassName('essay-item')[j];
      if (!panel) return
      var panelWidth = parseInt(win.getComputedStyle(panel,null).getPropertyValue('width'))
      h = h + s;
      let t = panel.offsetTop,
          p = panel.offsetParent;
      while (p !== null) {
        t += p.offsetTop;
        p = p.offsetParent;
      }
      let th = t + panel.clientHeight,
          right = (w - panelWidth) / 2 + btnRight > btnRight ? (w - panelWidth) / 2 + btnRight + 10: btnRight,
          essay = document.querySelector('.essay-wrap'),
          essayWidth = essay.style.width
      if (th - h > btnBottom && h - t > 120) {
        right = ww > 920 ? essayWidth === '70%' ? 0.336 * ww + btnRight + 10 : 0.09 * ww + btnRight + 10: right
        i.style.right = right + 'px'
        changeFix(i)
      } else {
        i.style.right = btnRight + 'px'
        changeStyle(i)
      }
    }
  };
})();
