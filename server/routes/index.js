import path from 'path'

export const routes = (app, dirname) => {
  app.get('/:note?/:edit?', async (req, res) => {
    res.sendFile(path.join(dirname, './source/public/index.html'))
  })
}
