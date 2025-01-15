package org.unical.webapp.backend.controller;

import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.AbstractController;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;
import org.unical.webapp.backend.service.UtenteServiceInterface;

import java.sql.Blob;
import java.util.Collection;


@RestController
@RequestMapping("/utente")
public class UtenteController {

    private final UtenteServiceInterface utenteService;

    public UtenteController(UtenteServiceInterface utenteService) {
        this.utenteService = utenteService;
    }

    @RequestMapping(value="/getContenutiByUtente/{utente}", method=RequestMethod.GET)
    ResponseEntity<Collection<Contenuto>> getContenutiByUtente(@PathVariable String utente) {
        return  ResponseEntity.ok(
                utenteService.getContenutiByUtente(utenteService.getByUsername(utente))
        );
    }

    @RequestMapping(value="/setProPic/{utente}", method=RequestMethod.POST)
    void setPropic(@RequestBody String utente, @RequestBody Blob propic) {
        utenteService.newProPic(utenteService.getByUsername(utente), propic);
    }

    @RequestMapping(value="/setBgImage/{utente}", method=RequestMethod.POST)
    void setBgImage(@PathVariable String utente, @RequestBody Blob image) {
        utenteService.newBgImage(utenteService.getByUsername(utente), image);
    }

    @RequestMapping(value="/getUtente/{utente}", method=RequestMethod.GET)
    ResponseEntity<Utente> getUtente(@PathVariable String utente) {
        return  ResponseEntity.ok(
                utenteService.getByUsername(utente)
        );
    }
}
