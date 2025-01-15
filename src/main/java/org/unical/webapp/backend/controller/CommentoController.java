package org.unical.webapp.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.unical.webapp.backend.model.Commento;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.persistence.dao.DaoImpl.proxy.CommentoProxy;
import org.unical.webapp.backend.service.CommentoServiceInterface;
import org.unical.webapp.backend.service.ContenutoServiceInterface;

import java.util.Collection;

@RestController
@RequestMapping("/commento")
public class CommentoController {

    private final CommentoServiceInterface commentoService;

    public CommentoController(CommentoServiceInterface commentoService) {
        this.commentoService = commentoService;
    }

    @RequestMapping(value="/setAnswer/{question}/{answer}", method= RequestMethod.GET)
    void setAnswer(@PathVariable int question, @PathVariable int answer) {
        commentoService.setAnswer(commentoService.getCommentoById(question), commentoService.getCommentoById(answer));
    }

    @RequestMapping(value="/newComment/{content_id}/{content_type}/{body}/{rating}/{user}/{answers_to}", method= RequestMethod.GET)
    void newComment(@PathVariable int content_id, @PathVariable boolean content_type, @PathVariable String body, @PathVariable int rating, @PathVariable String user, @PathVariable int answers_to) {
        Commento c = new CommentoProxy();
        c.setId_contenuto_api(content_id);
        c.setIs_serie(content_type);
        c.setContenuto(body);
        c.setVoto(rating);
        c.setUsername_utente(user);
        c.setCommento_risposto(answers_to);
        commentoService.saveCommento(c);
    }
}
