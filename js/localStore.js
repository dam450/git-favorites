class Store {
  /**
   * Inicialização e criação da storage
   * @param {String} storeName nome do local storage
   */
  constructor(storeName) {
    this.values = []
    this.storage = storeName || 'localStore'

    if(storeName) this.load()
  }

  /**
   * Salva para Local Storage os valores em memória
   * @param {String} storageName nome da storage 
   */
  save(storage) {
    localStorage.setItem(`@${storage || this.storage}:`, JSON.stringify(this.values))
  }

  /**
   * Recupera valores de local storage e carrega em memória
   * @param {String} storageName nome do storage
   */
  load(storage) {
    this.values = JSON.parse(localStorage.getItem(`@${storage || this.storage}:`)) || []
  }
  
  /**
   * Retorna o conteúdo da memória em um array
   * @returns Array
   */
  get() {
    return this.values
  }

  /**
   * Insere um valor em memória removendo valores anteriores
   * @param {*} value um valor qualquer
   */
  set(value) {
    this.clearValues()
    this.values.push(value) 
  }

  /**
   * Insere um valor em memória mantendo valores anteriores
   * @param {*} value um valor qualquer
   */
  push(value) {
    this.values.push(value)
  }

    
  add(value) {
    if(this.values)
      this.values = [value, ...this.values]
    else
      this.values = [value]
  }

  /**
   * limpa os valores da memória
   */
  clearValues() {
    this.values = []
  }

  /**
   * Nomeia a storage
   * @param {String} storeName nome da storage
   */
  setStoreName(storeName) {
    this.storage = storeName
  }

}

export { Store }