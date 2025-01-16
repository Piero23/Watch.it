package org.unical.webapp.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.unical.webapp.backend.model.Commento;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;
import org.unical.webapp.backend.service.ContenutoServiceInterface;
import org.unical.webapp.backend.service.UtenteServiceInterface;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/contenuto")
public class ContenutoController {

    private final ContenutoServiceInterface contenutoService;

    public ContenutoController(ContenutoServiceInterface contenutoService) {
        this.contenutoService = contenutoService;
    }

    @RequestMapping(value="/getCommenti/{type}/{id}", method= RequestMethod.GET)
    ResponseEntity<Collection<Commento>> getCommenti(@PathVariable String type, @PathVariable int id) {
        if (type.equals("film")) {
            return ResponseEntity.ok(
                    contenutoService.getCommenti(contenutoService.getById(id, false))
            );
        }
        else if (type.equals("tv")) {
            return ResponseEntity.ok(
                    contenutoService.getCommenti(contenutoService.getById(id, true))
            );
        }
        else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="/updateStatus/{utente}/{type}/{contenutoId}/{status}", method=RequestMethod.GET)
    void updateStatus(@PathVariable String utente, @PathVariable int contenutoId, @PathVariable String type, @PathVariable int status) {
        if (type.equals("film")) {
            contenutoService.aggiornaStatusContenuto(utente, contenutoId, false, status);
        }
        else if (type.equals("tv")) {
            contenutoService.aggiornaStatusContenuto(utente, contenutoId, true, status);
        }
    }

    @RequestMapping(value="/updateSeries/{utente}/{contenutoId}/{season}/{episode}", method=RequestMethod.GET)
    void updateSeries(@PathVariable String utente, @PathVariable int contenutoId, @PathVariable int season, @PathVariable int episode) {
        contenutoService.aggiornaVisualizzazione(utente, contenutoId, season, episode);
    }


    @RequestMapping(value="/deleteContent/{utente}/{tipo}/{id}", method=RequestMethod.GET)
    void deleteContent(@PathVariable String utente, @PathVariable String tipo, @PathVariable int id) {
        if (tipo.equals("movie")) {
            contenutoService.deleteContenuto(id, false, utente);
        }

        else if (tipo.equals("tv")) {
            contenutoService.deleteContenuto(id, true, utente);
        }
    }

    @RequestMapping(value = "/editRating/{utente}/{tipo}/{id}/{rating}", method=RequestMethod.GET)
    void editRating(@PathVariable String utente, @PathVariable String tipo, @PathVariable int id, @PathVariable int rating) {
        if (tipo.equals("film")) {
            contenutoService.modificaVoto(utente, false, id, rating);

        }
        else if (tipo.equals("tv")) {
            contenutoService.modificaVoto(utente, true, id, rating);
        }
    }

}
