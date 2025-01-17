package org.unical.webapp.backend.persistence.dao.DaoImpl;

import org.springframework.stereotype.Component;
import org.unical.webapp.backend.model.Commento;
import org.unical.webapp.backend.persistence.DBManager;
import org.unical.webapp.backend.persistence.dao.CommentoDao;
import org.unical.webapp.backend.persistence.dao.DaoImpl.proxy.CommentoProxy;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ConcreteCommentoDao implements CommentoDao {

  Connection connection;

  public ConcreteCommentoDao() {this.connection = DBManager.getInstance().getConnection();}

  @Override
  public Commento findById(int id) {
    try {
      PreparedStatement query = connection.prepareStatement("select * from commenti where id_commento = ?");
      query.setInt(1, id);
      ResultSet rs = query.executeQuery();
      rs.next();
      Commento commento = new CommentoProxy();
      commento.setId_commento(rs.getInt("id_commento"));
      commento.setId_contenuto_api(rs.getInt("id_contenuto_api"));
      commento.setIs_serie(rs.getBoolean("is_serie"));
      commento.setContenuto(rs.getString("contenuto"));
      commento.setVoto(rs.getInt("voto"));
      commento.setUsername_utente(rs.getString("username_utente"));
      commento.setCommento_risposto(rs.getInt("commento_risposto"));
      commento.setRisposte(commento.getRisposte());

        return commento;

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public List<Commento> findAll() {
    List<Commento> commenti = new ArrayList<Commento>();
    try {
      PreparedStatement query = connection.prepareStatement("select * from commenti");
      ResultSet rs = query.executeQuery();
      while (rs.next()){
        Commento commento = new CommentoProxy();
        commento.setId_commento(rs.getInt("id_commento"));
        commento.setId_contenuto_api(rs.getInt("id_contenuto_api"));
        commento.setIs_serie(rs.getBoolean("is_serie"));
        commento.setContenuto(rs.getString("contenuto"));
        commento.setVoto(rs.getInt("voto"));
        commento.setUsername_utente(rs.getString("username_utente"));
        commento.setCommento_risposto(rs.getInt("commento_risposto"));
        commento.setRisposte(commento.getRisposte());

        commenti.add(commento);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return commenti;
  }

  @Override
  public void save(Commento commento) {
    try{
      PreparedStatement query = connection.prepareStatement(
        "insert into commenti (id_contenuto_api, is_serie, contenuto, voto, username_utente, commento_risposto) values (?, ?, ?, ?, ?, ?)"
      );

      query.setInt(1, commento.getId_contenuto_api());
      query.setBoolean(2, commento.isIs_serie());
      query.setString(3, commento.getContenuto());
      query.setInt(4, commento.getVoto());
      query.setString(5, commento.getUsername_utente());
      if(commento.getCommento_risposto() == null){
        query.setNull(6,java.sql.Types.INTEGER);
      }else
        query.setInt(6, commento.getCommento_risposto());
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void delete(Commento commento) {
    try{
      PreparedStatement query = connection.prepareStatement(
        "delete from commento where id_commento=?"
      );

      query.setInt(1, commento.getId_commento());
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public List<Commento> findByContent(int contentId, boolean type) {
    List<Commento> commenti = new ArrayList<Commento>();
    try {
      PreparedStatement query = connection.prepareStatement("select * from commenti where id_contenuto_api=? and is_serie=? and (commento_risposto is NULL or commento_risposto = -1)");
      query.setInt(1, contentId);
      query.setBoolean(2, type);
      ResultSet rs = query.executeQuery();
      while (rs.next()){
        Commento commento = new CommentoProxy();
        commento.setId_commento(rs.getInt("id_commento"));
        commento.setId_contenuto_api(rs.getInt("id_contenuto_api"));
        commento.setIs_serie(rs.getBoolean("is_serie"));
        commento.setContenuto(rs.getString("contenuto"));
        commento.setVoto(rs.getInt("voto"));
        commento.setUsername_utente(rs.getString("username_utente"));
        commento.setCommento_risposto(rs.getInt("commento_risposto"));
        commento.setRisposte(commento.getRisposte());

        commenti.add(commento);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return commenti;
  }

  @Override
  public List<Commento> findResponses(Commento commento) {
    List<Commento> commenti = new ArrayList<Commento>();
    try {
      PreparedStatement query = connection.prepareStatement("select * from commenti where commento_risposto=?");
      query.setInt(1, commento.getId_commento());
      ResultSet rs = query.executeQuery();
      while (rs.next()){
        Commento comm = new CommentoProxy();
        comm.setId_commento(rs.getInt("id_commento"));
        comm.setId_contenuto_api(rs.getInt("id_contenuto_api"));
        comm.setIs_serie(rs.getBoolean("is_serie"));
        comm.setContenuto(rs.getString("contenuto"));
        comm.setVoto(rs.getInt("voto"));
        comm.setUsername_utente(rs.getString("username_utente"));
        comm.setCommento_risposto(rs.getInt("commento_risposto"));

        commenti.add(comm);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return commenti;
  }

  @Override
  public void setAnswer(Commento question, Commento answer){
    try {
      PreparedStatement query = connection.prepareStatement("update commenti set commento_risposto=? where id_commento=?");
      query.setInt(1, question.getId_commento());
      query.setInt(2, answer.getId_commento());
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

}
