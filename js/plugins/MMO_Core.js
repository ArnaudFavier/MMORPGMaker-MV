//=============================================================================
// MMO.js
//=============================================================================

/*:
 * @plugindesc MMORPG Maker MV - Core
 * @author Samuel LESPES CARDILLO
 *
 * @help Change the server location. (default being the local server)
 * 
 * @param Server Location
 * @desc Server address (+ port)
 * @default http://127.0.0.1:8097/
 */


function MMO_Core() { 
  this.initialize.apply(this, arguments);
}

MMO_Core.Parameters = PluginManager.parameters('MMO_Core');
MMO_Core.socket = io.connect(String(MMO_Core.Parameters['Server Location']));

(function() {

  MMO_Core.socket.on('connect_error', function() {
    document.dispatchEvent(new Event('mmorpg_core_lost_connection')); // Dispatch event for connection lost.
    MMO_Core.socket.close();
  })

  // Clean up the menu
  Window_MenuCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
    this.addOriginalCommands();
    this.addOptionsCommand();
  };

  // ---------------------------------------
  // ---------- Exposed Functions
  // ---------------------------------------

  MMO_Core.sendMessage = function(message) {
    MMO_Core.socket.emit("new_message", message);
  }
})();



