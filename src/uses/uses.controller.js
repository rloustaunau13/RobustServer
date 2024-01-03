const path = require("path");
const uses = require(path.resolve("src/data/uses-data"));



function list(req, res) {
  res.json({ data: uses });
}


function read(req, res) {  
 
  res.json({ data: res.locals.paste });
}

function useExist(req, res, next) {
  const useId = Number(req.params.useId);
  const foundUse = uses.find((use) => use.id === useId);
  console.log(useId+"FOUND Use");
  
  if (foundUse) {
     res.locals.paste = foundUse;
    return next();
  }
  next({
    status: 404,
    message: `Use id not found: ${req.params.useId}`,
  });
}



function destroy(req, res,next) {
  const { useId } = req.params;
 const index = uses.findIndex((use) => use.id === Number(useId));
  


  if (index > -1) {
    uses.splice(index, 1);
   
  }
  
  
   res.sendStatus(204);
}



module.exports = {
  list,
  read:[useExist,read],
  delete:[useExist,destroy],
}