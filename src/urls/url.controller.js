
const path = require("path");
const urls = require(path.resolve("src/data/urls-data"));

const uses = require(path.resolve("src/data/uses-data"));

const usesRouter = require("../uses/uses.router");


const { create13 } = usesRouter;

function list(req, res) {
  res.json({ data: urls });
}

function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((url) => url.id === urlId);
  console.log(foundUrl+"FOUND URL");
  
  if (foundUrl ) {
     res.locals.paste = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `Url id not found: ${req.params.urlId}`,
  });
}



function create(req, res) {
  const { data: { href } = {} } = req.body;
  
  const newUrl = {
    id: urls.length + 1,
    href,
    
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function hasHRef(req, res, next) {
  const { data: { href } = {} } = req.body;

  if (href) {
    return next();
  }
  next({ status: 400, message: "A 'href' property is required." });
}

function read(req, res) {  
   
 
  const foundUrl = res.locals.paste;

  if (foundUrl) {
    // Create a use record
    const useRecord = {
      id: uses.length + 1,
      urlId: foundUrl.id,
      time: Date.now(),
    };

    // Add the use record to the uses array
    uses.push(useRecord);


  return res.json({ data: foundUrl });
 }
  
  }

 

function update(req, res) {
 
  const { data: { href } = {} } = req.body;

 let foundUrl=res.locals.paste;
  
  foundUrl.href = href;

  res.json({ data: foundUrl });
}



module.exports = {
   read:[urlExists,read],
create:[hasHRef,create],
  list,
  update:[urlExists,hasHRef,update],
  urlExists,

}