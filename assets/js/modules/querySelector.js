/**
 * Syntaxe courte pour récupérer un élément du DOM avec QuerySelectorAll
 * @param {string} query Element rechrché
 * @param {boolean} forceNodeList Forcer à renvoyer une NodeList, cf. Documentation
 * @returns {(HTMLElement|NodeList)} Element ou liste d'éléments si plusieurs
 */
export default function (query, forceNodeList = false) {
  const result = document.querySelectorAll(query)
  if (!result[0]) {
    return null
  } else if (result.length === 1 && !forceNodeList) {
    return result[0]
  } else {
    return result
  }
}
