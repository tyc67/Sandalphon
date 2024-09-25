const moneyStringToNumber = (money: string): number => {
  const separatorDecimal = new Intl.NumberFormat('en-US', {
    style: 'decimal',
  })
    .format(11.11)
    .replace(/\d/g, '')

  const separatorThousands = new Intl.NumberFormat('en-US', {
    style: 'decimal',
  })
    .format(1111)
    .replace(/\d/g, '')

  const stringNumber = money
    .replace(new RegExp(`[${separatorThousands}]`, 'g'), '')
    .replace(separatorDecimal, '.')

  return parseFloat(stringNumber)
}

export { moneyStringToNumber }
